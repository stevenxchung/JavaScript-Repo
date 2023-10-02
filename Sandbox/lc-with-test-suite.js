const { performance } = require("perf_hooks");

/*
  - Track day (index) in monotonically decreasing stack
  - Stack only needs to track index since temperature is already in input
  - While loop for popping off stack and computing days
*/
class Solution {
  method(temperatures) {
    const stack = [];
    const res = new Array(temperatures.length).fill(0);

    for (const [currDay, t] of temperatures.entries()) {
      while (stack && temperatures[stack[stack.length - 1]] < t) {
        const prevDay = stack.pop();
        // Number of days until greater temperature
        res[prevDay] = currDay - prevDay;
      }
      stack.push(currDay);
    }

    return res;
  }

  reference() {}

  quantify(testCases, runs = 1e6) {
    const runsArr = Array.from({ length: runs });
    const solStart = performance.now();
    runsArr.map((_, i) => {
      testCases.map((input) => {
        if (i === 0) console.log(this.method(input));
        else this.method(input);
      });
    });
    console.log(
      `Runtime for solution: ${(performance.now() - solStart) / 1000}\n`
    );

    const refStart = performance.now();
    runsArr.map((_, i) => {
      testCases.map((input) => {
        if (i === 0) console.log(this.reference(input));
        else this.reference(input);
      });
    });
    console.log(
      `Runtime for reference: ${(performance.now() - refStart) / 1000}`
    );
  }
}

const test = new Solution();
const testCases = [
  [73, 74, 75, 71, 69, 72, 76, 73],
  [30, 40, 50, 60],
  [30, 60, 90],
];
test.quantify(testCases);
