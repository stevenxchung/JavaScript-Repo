const { performance } = require("perf_hooks");

/*
  - Binary search starting at ends of sorted (possibly rotated) input array
  - Compare left and right pointers with each other find min
*/
class Solution {
  method(nums) {
    let [l, r] = [0, nums.length - 1];

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (nums[l] < nums[r]) {
        return nums[l];
      } else {
        l = m + 1;
      }
    }
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
  [3, 4, 5, 1, 2],
  [4, 5, 6, 7, 0, 1, 2],
  [11, 13, 15, 17],
];
test.quantify(testCases);
