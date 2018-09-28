// Understand Reactive Programming using RxJS
// What is an event stream?
// An event stream is a sequence of ongoing events ordered in time which can emit three things:
// a value, error, or complicated signal.

// No streams
console.clear();
let source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
let result = source;
console.log(result);

// Event stream
console.clear();
let source = Rx.Observable.interval(400)
  .take(9)
  .map(i => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i]);
let result = source;
result.subscribe(x => console.log(x));

// Transform into actual parsed value
console.clear();
let source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
let result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x).reduce((x, y) => x + y));
console.log(result);

// Event stream transform
console.clear();
let source = Rx.Observable.interval(400)
  .take(9)
  .map(i => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i]);
let result = source
  .map(x => parseInt(x))
  .filter(x => !NaN(x))
  .reduce((x, y) => x + y);
result.subscribe(x => console.log(x));
