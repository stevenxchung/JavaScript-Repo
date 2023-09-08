const { performance } = require("perf_hooks");

class Solution {
  method(s) {
    /*
    sliding window
    use set() to track seen characters
    expand window until duplicate reached
    shrink window by left pointer until duplicate removed
    */
    let l = 0;
    let maxLen = 0;
    const seen = new Set();
    for (let r = 0; r < s.length; r++) {
      while (seen.has(s[r])) {
        seen.delete(s[l]);
        l++;
      }
      seen.add(s[r]);
      maxLen = Math.max(maxLen, seen.size);
    }

    return maxLen;
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
const testCases = ["abcabcbb", "bbbbb", "pwwkew"];
test.quantify(testCases);
