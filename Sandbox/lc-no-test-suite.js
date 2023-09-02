const { performance } = require("perf_hooks");

class Solution {
  method() {
    return;
  }
}

const test = new Solution();
const solStart = performance.now();
test.method();
console.log(`Runtime for solution: ${(performance.now() - solStart) / 1000}\n`);
