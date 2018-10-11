// map() method
let getStockSymbols = stocks => {
  return stocks.map(stock => {
    return stock.symbol;
  });
};

// Array.prototype.map = projection => {
//   let results = [];

//   this.forEach(item => {
//     results.push(projection(item));
//   });

//   return results;
// };

let symbols = getStockSymbols([
  { symbol: 'XFX', price: 240.22, volume: 23432 },
  { symbol: 'TNZ', price: 332.19, volume: 234 },
  { symbol: 'JXJ', price: 120.22, volume: 5323 }
]);

console.log(symbols);
