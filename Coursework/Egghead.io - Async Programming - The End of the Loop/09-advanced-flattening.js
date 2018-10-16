// Advanced flattening
let exchanges = [
  {
    name: 'NYSE',
    stocks: [
      {
        symbol: 'XFX',
        closes: [
          { date: new Date(2014, 11, 24), price: 240.1 },
          { date: new Date(2014, 11, 23), price: 232.08 },
          { date: new Date(2014, 11, 22), price: 241.09 }
        ]
      },
      {
        symbol: 'TNZ',
        closes: [
          { date: new Date(2014, 11, 24), price: 521.24 },
          { date: new Date(2014, 11, 23), price: 511.0 },
          { date: new Date(2014, 11, 22), price: 519.29 }
        ]
      }
    ]
  },
  {
    name: 'TSX',
    stocks: [
      {
        symbol: 'JXJ',
        closes: [
          { date: new Date(2014, 11, 24), price: 423.22 },
          { date: new Date(2014, 11, 23), price: 424.84 },
          { date: new Date(2014, 11, 22), price: 419.72 }
        ]
      },
      {
        symbol: 'NYN',
        closes: [
          { date: new Date(2014, 11, 24), price: 16.82 },
          { date: new Date(2014, 11, 23), price: 16.12 },
          { date: new Date(2014, 11, 22), price: 15.77 }
        ]
      }
    ]
  }
];

Array.prototype.concatAll = function() {
  let results = [];

  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });

  return results;
};
//[1,2,3].map(function(num) { return num + 1; }) -> [2,3,4]
//[1,2].map(function(num) { return [num + 1, num + 2]; }) -> [[2,3],[3,4]]

let christmasEveCloses = exchanges
  .map(exchange => {
    return exchange.stocks
      .map(stock => {
        return stock.closes
          .filter(close => {
            return close.date.getMonth() === 11 && close.date.getDate() === 24;
          })
          .map(close => {
            return {
              symbol: stock.symbol,
              price: close.price
            };
          });
      })
      .concatAll();
  })
  .concatAll();

christmasEveCloses.forEach(function(christmasEveClose) {
  console.log(christmasEveClose);
  // Display in plunker preview
  displayInPreview(JSON.stringify(christmasEveClose));
});

// Display in plunker preview
function displayInPreview(string) {
  let newDiv = document.createElement('div');
  let newContent = document.createTextNode(string);
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
}
