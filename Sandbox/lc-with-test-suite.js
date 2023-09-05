const { performance } = require("perf_hooks");

class Solution {
  method(nums) {
    /*
    convert input to set
    check if element start of sequence
    increment and check set -> update longest sequence
    */
    const seen = new Set(nums);
    let longestSequence = 0;
    for (const num of seen) {
      if (seen.has(num - 1)) continue;

      let count = 1;
      while (seen.has(num + count)) {
        count++;
      }
      longestSequence = Math.max(longestSequence, count);
    }

    return longestSequence;
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
  [100, 4, 200, 1, 3, 2],
  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
];
test.quantify(testCases);
