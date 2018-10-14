// Drag and Drop with Observables
let parent = document.getElementById('parent');
let widget = document.getElementById('widget');

let mouseDowns = rxjs.fromEvent(widget, 'mousedown');
let parentMouseMoves = rxjs.fromEvent(parent, 'mousemove');
let parentMouseUps = rxjs.fromEvent(parent, 'mouseup');

// let stocks =
//   exchanges.
//     map(function(exchange) {
//       return exchange.stocks.
//         filter(function(stock) { return stock.price >= 100.00; });
//     }).
//     concatAll();

let drags = mouseDowns.pipe(
  rxjs.operators.map(e => {
    return parentMouseMoves.takeUntil(parentMouseUps);
  }),
  rxjs.operators.concatAll()
);

let subscription = drags.forEach(
  function onNext(e) {
    widget.style.left = e.clientX + 'px';
    widget.style.top = e.clientY + 'px';
  },
  function onError(error) {
    console.log('error');
  },
  function onCompleted() {}
);
