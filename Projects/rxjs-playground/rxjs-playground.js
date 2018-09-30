// Observables
let button = document.querySelector('button');

// Old way
// button.addEventListener('click', event => {
//   console.log(event);
// });

// RxJS implementation
// const source = rxjs
//   .fromEvent(document, 'click')
//   .subscribe(event => console.log(event));

// Add pipe() and throttleTime()
// const source = rxjs
//   .fromEvent(document, 'click')
//   .pipe(rxjs.operators.throttleTime(1000))
//   .subscribe(event => console.log(event));

// Add map()
// const source = rxjs
//   .fromEvent(document, 'click')
//   .pipe(rxjs.operators.throttleTime(1000),
//   rxjs.operators.map((data) => { return data.clientY })
//   )
//   .subscribe(coodinate => console.log(coodinate));

// mergeMap()
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');

let span = document.querySelector('span');

// Two inputs, two data sources, overrides instead of combining values
// let obs1 = rxjs
//   .fromEvent(input1, 'input')
//   .subscribe(event => (span.textContent = event.target.value));

// let obs2 = rxjs
//   .fromEvent(input2, 'input')
//   .subscribe(event => (span.textContent = event.target.value));

let obs1 = rxjs.fromEvent(input1, 'input');
let obs2 = rxjs.fromEvent(input2, 'input');

// Will merge two data streams together
obs1
  .pipe(
    rxjs.operators.mergeMap(event1 => {
      return obs2.pipe(
        rxjs.operators.map(
          event2 => event1.target.value + ' ' + event2.target.value
        )
      );
    })
  )
  .subscribe(combinedValue => (span.textContent = combinedValue));
