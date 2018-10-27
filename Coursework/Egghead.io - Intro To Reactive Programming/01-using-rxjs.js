// What is Reactive Programming?
// Reactive programming is programming with event streams

// Example 1
// Below is a program which console.log() the source array which is already in memory
// const example1 = (() => {
//   console.clear();
//   const source = ['1', '2', '3'];
//   const result = source;
//   console.log(result);
// })();

// Example 2
// Below is a program which will console.log the array values asynchronously in 500 ms intervals
const example2 = (() => {
  console.clear();
  const source = rxjs.interval(500).pipe(rxjs.operators.take(6));
  //output: 0,1,2,3,4,5....
  const subscribe = source.subscribe(val => console.log(val));
})();
