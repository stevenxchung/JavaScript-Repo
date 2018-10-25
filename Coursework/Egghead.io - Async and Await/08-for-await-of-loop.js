// Value generator
// function* someGenerator() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// function main() {
//   for (const value of someGenerator()) {
//     console.log(value);
//   }
// }

// main();

// Async value generator
Symbol.asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');

const delay = (ms) => new Promise(resolve => {
  setTimeout(resolve, ms);
});

async function* someGenerator() {
  await delay(1000);
  yield 1;
  await delay(1000);
  yield 2;
  await delay(1000);
  yield 3;
}

function main() {
  // Gets promise from someGenerator() and waits until promise has resolved
  for (const value of someGenerator()) {
    console.log(value);
  }
}

main();
