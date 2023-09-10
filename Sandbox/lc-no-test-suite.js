const { performance } = require("perf_hooks");

/*
  - Utilize a stack where min is always on top
  - On push, compare with top to update min if necessary
*/
class Solution {
  constructor(debug = false) {
    this.debug = debug;
    // Stores [val, min], end of stack is the "top"
    this.stack = [];
  }

  push(val) {
    const currMin = this.getMin();
    val < currMin
      ? this.stack.push([val, val])
      : this.stack.push([val, currMin]);
  }

  pop() {
    this.stack.pop();
  }

  top() {
    const res = this.stack[this.stack.length - 1][0];
    if (this.debug) console.log(`top(): ${res}`);
    return res;
  }

  getMin() {
    // Handle edge case
    if (this.stack.length === 0) return Number.MAX_SAFE_INTEGER;

    const res = this.stack[this.stack.length - 1][1];
    if (this.debug) console.log(`getMin(): ${res}`);
    return res;
  }
}

const test = new Solution((debug = true));
const solStart = performance.now();
test.push(-2);
test.push(0);
test.push(-3);
test.getMin(); // return -3
test.pop();
test.top(); // return 0
test.getMin(); // return -2
console.log(`Runtime for solution: ${(performance.now() - solStart) / 1000}`);
