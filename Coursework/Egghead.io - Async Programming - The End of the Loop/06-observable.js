// Introducing Observables
// Classic click listener
// let Observable = rxjs.Observable;
// let button = document.getElementById('btn');
// let handler = e => {
//   alert('Clicked!');
//   button.removeEventListener('click', handler);
// };

// button.addEventListener('click', handler);

// Example 1
// let button = document.getElementById('btn');
// let clicks = rxjs.fromEvent(button, 'click');
// [1, 2, 3].forEach(i => console.log(i));

// Example 2
// let button = document.getElementById('btn');
// let clicks = rxjs.fromEvent(button, 'click');
// clicks.forEach(e => console.log('Clicked!'));

// Demo
let arr = [];
let button = document.getElementById('btn');
let clicks = rxjs.fromEvent(button, 'click');
clicks.pipe(rxjs.operators.take(1)).subscribe(i => {
  arr.push(i);
  console.log(arr.length);
});
