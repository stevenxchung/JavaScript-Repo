let stocks = [
  { symbol: 'XFX', price: 240.22, volume: 23432 },
  { symbol: 'TNZ', price: 332.19, volume: 234 },
  { symbol: 'JXJ', price: 120.22, volume: 5323 }
];

let filteredStockSymbols = stocks
  .filter(stock => {
    return stock.price >= 150.0;
  })
  .map(stock => {
    return stock.symbol;
  });

filteredStockSymbols.forEach(symbol => {
  console.log(symbol);
});
