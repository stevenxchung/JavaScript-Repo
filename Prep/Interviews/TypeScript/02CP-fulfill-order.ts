type Size = "small" | "medium" | "large";
type Topping =
  | "pepperoni"
  | "greenPepper"
  | "redPepper"
  | "pineapple"
  | "mushroom"
  | "sausage"
  | "blackOlive";

type QuantityByPizzaSize = {
  [K in Size]: number;
};

type ToppingQuantity = {
  [k in Topping]: QuantityByPizzaSize;
};

type PizzaCost = QuantityByPizzaSize;

type ToppingCost = {
  [k in Topping]: QuantityByPizzaSize;
};

const basePizzaCostBySize: PizzaCost = {
  large: 1500,
  medium: 1000,
  small: 750,
};

const toppingCostBySize: ToppingCost = {
  pepperoni: {
    large: 199,
    medium: 150,
    small: 50,
  },
  greenPepper: {
    large: 50,
    medium: 50,
    small: 50,
  },
  redPepper: {
    large: 50,
    medium: 50,
    small: 50,
  },
  pineapple: {
    large: 150,
    medium: 75,
    small: 50,
  },
  mushroom: {
    large: 50,
    medium: 50,
    small: 50,
  },
  sausage: {
    large: 250,
    medium: 150,
    small: 100,
  },
  blackOlive: {
    large: 150,
    medium: 75,
    small: 50,
  },
};

const toppingQtyConsumedBySize: ToppingQuantity = {
  pepperoni: {
    large: 20,
    medium: 16,
    small: 12,
  },
  greenPepper: {
    large: 1,
    medium: 0.5,
    small: 0.25,
  },
  redPepper: {
    large: 1,
    medium: 0.5,
    small: 0.25,
  },
  pineapple: {
    large: 1.5,
    medium: 1,
    small: 0.5,
  },
  mushroom: {
    large: 20,
    medium: 16,
    small: 12,
  },
  sausage: {
    large: 20,
    medium: 16,
    small: 12,
  },
  blackOlive: {
    large: 40,
    medium: 32,
    small: 24,
  },
};

type ToppingInventory = {
  name: string;
  identifier: Topping;
  quantity: number;
};

var toppingInventory: ToppingInventory[] = [
  {
    name: "Pepperoni Slices",
    identifier: "pepperoni",
    quantity: 2000,
  },
  {
    name: "Green Pepper (whole)",
    identifier: "greenPepper",
    quantity: 12,
  },
  {
    name: "Red Pepper (whole)",
    identifier: "redPepper",
    quantity: 10,
  },
  {
    name: "Pineapple Can",
    identifier: "pineapple",
    quantity: 5,
  },
  {
    name: "Mushroom Slice",
    identifier: "mushroom",
    quantity: 200,
  },
  {
    name: "Sausage Chunks",
    identifier: "sausage",
    quantity: 100,
  },
  {
    name: "Black Olive Slice",
    identifier: "blackOlive",
    quantity: 200,
  },
];

type Order = {
  id: number;
  orderDate: string;
  size: Size;
  toppings: Topping[];
};

const orders: Order[] = [
  {
    id: 1,
    orderDate: "Dec 01 2023 14:35:31 GMT-0500 (Eastern Standard Time)",
    size: "small",
    toppings: ["mushroom", "pepperoni"],
  },
  {
    id: 2,
    orderDate: "Dec 01 2023 14:25:31 GMT-0500 (Eastern Standard Time)",
    size: "large",
    toppings: ["pineapple", "pepperoni", "blackOlive"],
  },
  {
    id: 3,
    orderDate: "Dec 02 2023 14:25:31 GMT-0500 (Eastern Standard Time)",
    size: "large",
    toppings: ["pineapple", "sausage", "redPepper"],
  },
  {
    id: 4,
    orderDate: "Nov 01 2023 14:25:31 GMT-0500 (Eastern Standard Time)",
    size: "medium",
    toppings: ["pineapple", "mushroom"],
  },
  {
    id: 5,
    orderDate: "Dec 11 2023 04:35:31 GMT-0500 (Eastern Standard Time)",
    size: "small",
    toppings: ["sausage", "pepperoni"],
  },
  {
    id: 6,
    orderDate: "Feb 01 2023 14:35:31 GMT-0500 (Eastern Standard Time)",
    size: "large",
    toppings: ["pineapple"],
  },
];

/**
 * 1) Given we want to fulfill orders based on order date and ingredients are limited, return orders which cannot be fulfilled if any
 * 2) For the orders which are unfulfilled, how much does it cost?
 * 3) Repeat #1 ordered by most profitable orders
 * 4) BONUS: get orders fulfilled and profit
 */

const fulfillOrders = (orders: Order[], sortBy = "date"): Order[] => {
  switch (sortBy) {
    case "profit":
      orders.sort((a, b) => calculateCost([b]) - calculateCost([a]));
      break;
    default:
      orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
  }

  const inventoryStore = toppingInventory.reduce((acc, obj) => {
    acc[obj.identifier] = obj.quantity;
    return acc;
  }, {} as Record<string, number>);

  const unfulfilled = [];

  for (const order of orders) {
    let canFulfill = true;
    for (const topping of order.toppings) {
      const cost = toppingQtyConsumedBySize[topping][order.size];
      if (inventoryStore[topping] - cost < 0) {
        unfulfilled.push(order);
        canFulfill = false;
      }
    }

    if (canFulfill) {
      for (const topping of order.toppings) {
        const cost = toppingQtyConsumedBySize[topping][order.size];
        inventoryStore[topping] -= cost;
      }
    }
  }

  return unfulfilled;
};

const calculateCost = (orders: Order[]): number => {
  let cost = 0;
  for (const order of orders) {
    cost += basePizzaCostBySize[order.size];
    for (const topping of order.toppings) {
      cost += toppingCostBySize[topping][order.size];
    }
  }

  return cost;
};

function main() {
  const options = ["date", "profit"];
  for (const option of options) {
    console.log("\n********** Processing Orders ********** ");
    console.log("Orders unfulfilled:");
    const unfulfilled = fulfillOrders(orders, option);
    console.log(unfulfilled);
    console.log(`Cost: $${calculateCost(unfulfilled).toFixed(2)}`);

    const unfulfilledIds = new Set(unfulfilled.map((u) => u.id));
    const fulfilled = orders.filter((o) => !unfulfilledIds.has(o.id));
    // Log as number to reduce noise
    console.log(`\nOrders fulfilled: ${fulfilled.length}`);
    console.log(`Profit: $${calculateCost(fulfilled).toFixed(2)}`);
  }
}

main();
