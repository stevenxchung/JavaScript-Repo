// All changes here will automatically refresh browser via webpack :)

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

console.clear();

// Example 1
// Console log the source array which is already in memory
const example1 = (() => {
  const source = ['1', '2', '3'];
  const result = source;
  console.log('example 1:', result);
})();

// Example 2
// Console log the array values asynchronously in 500 ms intervals
const example2 = (() => {
  const source = rxjs.interval(500).pipe(rxjs.operators.take(6));
  //output: 0,1,2,3,4,5....
  const subscribe = source.subscribe(val => console.log('example 2:', val));
})();

// Example 3
// Map out the array to ints then filter out all non ints and return the sum
const example3 = (() => {
  const source = ['1', '2', '3', '4', '5', 'S', 't', 'e', 'v', 'e', 'n'];
  const result = source
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y);
  console.log('example 3:', result);
})();

// Example 4
// Same as example 3 but asynchronous
const example4 = (() => {
  const source = rxjs.pipe(
    rxjs.Observable,
    rxjs.interval(500),
    rxjs.operators.take(11),
    rxjs.operators.map(
      i => ['1', '2', '3', '4', '5', 'S', 't', 'e', 'v', 'e', 'n'][i]
    )
  );
  const result = source
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y);
  result.subscribe(x => console.log('example 4:', x));
})();
