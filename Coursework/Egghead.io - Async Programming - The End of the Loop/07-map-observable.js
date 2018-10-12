// Map with observables
// let button = document.getElementById('btn');
// let clicks = rxjs.fromEvent(button, 'click');
// clicks.pipe(rxjs.operators.take(1)).subscribe(i => {
//   console.log('x: ' + i.clientX, 'y: ' + i.clientY);
// });

let button = document.getElementById('btn');
let clicks = rxjs.fromEvent(button, 'click');
let points = clicks
  .pipe(
    rxjs.operators.map(e => {
      return {
        x: e.clientX,
        y: e.clientY
      };
    }),
    rxjs.operators.take(1)
  )
  .subscribe(i => console.log(i));
