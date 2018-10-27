// What is Reactive Programming?
// Reactive programming is programming with event streams

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
