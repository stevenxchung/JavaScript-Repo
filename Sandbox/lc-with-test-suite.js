const { performance } = require("perf_hooks");

/*
  - Binary search starting at ends of input array
  - Input may or may not be rotated, check subarray on each iteration
*/
class Solution {
  method(nums, target) {
    let [l, r] = [0, nums.length - 1];

    while (l <= r) {
      const m = Math.floor((l + r) / 2);

      if (target === nums[m]) return m;
      else if (target < nums[m]) {
        // Normal case: left is less than right
        if (nums[l] < nums[r]) r = m - 1;
        // Rotated case: left is greater than right
        else l = m + 1;
      } else {
        // Opposite of above cases
        if (nums[l] < nums[r]) l = m + 1;
        else r = m - 1;
      }
    }

    return -1;
  }

  reference() {}

  quantify(testCases, runs = 1e6) {
    const runsArr = Array.from({ length: runs });
    const solStart = performance.now();
    runsArr.map((_, i) => {
      testCases.map((input) => {
        if (i === 0) console.log(this.method(...input));
        else this.method(...input);
      });
    });
    console.log(
      `Runtime for solution: ${(performance.now() - solStart) / 1000}\n`
    );

    const refStart = performance.now();
    runsArr.map((_, i) => {
      testCases.map((input) => {
        if (i === 0) console.log(this.reference(...input));
        else this.reference(...input);
      });
    });
    console.log(
      `Runtime for reference: ${(performance.now() - refStart) / 1000}`
    );
  }
}

const test = new Solution();
const testCases = [
  [[4, 5, 6, 7, 0, 1, 2], 0],
  [[4, 5, 6, 7, 0, 1, 2], 3],
  [[1], 0],
];
test.quantify(testCases);
