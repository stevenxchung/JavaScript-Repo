// Value generator
function* someGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

function main() {
  for (const value of someGenerator()) {
    console.log(value);
  }
}

main();
