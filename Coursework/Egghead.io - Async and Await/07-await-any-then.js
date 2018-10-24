// Await non-promise
// async function main() {
//   const x = await 42;
//   console.log(x);
// }

// main();

// Await with thenable
const Bluebird = require('bluebird');

async function main() {
  console.log('Working...');
  // Returns a 'thenable' - an object with a then()
  await Bluebird.delay(2000);
  console.log('Done');
}

main();
