// Recap: map(), filter(), and reject() transform a list into something else
// This lesson: reduce() can be used to express any list transformation e.g. map(), filter(), reject(), etc.

// Example 1
let orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 },
]

let totalAmount = 0;
for (var i = 0; i < orders.length; i++) {
    totalAmount += orders[i].amount;
}
// Check result
console.log(totalAmount);
