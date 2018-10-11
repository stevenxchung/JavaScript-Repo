// The old way of filtering
let getStocksOver = (stocks, minPrice) => {
  let results = [];

  stocks.forEach(stock => {
    if (stock.price >= minPrice) {
      results.push(stock);
    }
  });

  return results;
};

let expensiveStocks = getStocksOver(
  [
    { symbol: 'XFX', price: 240.22, volume: 23432 },
    { symbol: 'TNZ', price: 332.19, volume: 234 },
    { symbol: 'JXJ', price: 120.22, volume: 5323 }
  ],
  150.0
);

console.log(expensiveStocks);

// Using filter() method
let getStocksOver = (stocks, minPrice) => {
  return stocks.filter(stock => {
    return stock.price >= minPrice;
  });
};

// Array.prototype.filter = predicate => {
//   let results = [];

//   this.forEach(time => {
//     if (predicate(time)) {
//       results.push(item);
//     }
//   });

//   return results;
// };

let expensiveStocks = getStocksOver(
  [
    { symbol: 'XFX', price: 240.22, volume: 23432 },
    { symbol: 'TNZ', price: 332.19, volume: 234 },
    { symbol: 'JXJ', price: 120.22, volume: 5323 }
  ],
  150.0
);

console.log(expensiveStocks);
