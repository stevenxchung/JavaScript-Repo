const { performance } = require("perf_hooks");

class Solution {
  method(nums) {
    /*
    sort input
    one main loop
    two pointer search
    use set to track triplets
    */
    nums.sort();
    const res = [];
    const seen = new Set();

    for (const [i, a] of nums.entries()) {
      // Skip since value already exists
      if (seen.has(a)) continue;

      // Two pointer search
      let [l, r] = [i + 1, nums.length - 1];
      while (l < r) {
        const [b, c] = [nums[l], nums[r]];
        const sum = a + b + c;

        if (sum === 0) {
          res.push([a, b, c]);
          l++;
          // Ensure that value is different to avoid duplicates
          while (seen.has(b) && l < r) l++;
        } else if (sum < 0) l++;
        else if (sum > 0) r--;
      }
      // Add value to seen
      seen.add(a);
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
  [-1, 0, 1, 2, -1, -4],
  [0, 1, 1],
  [0, 0, 0],
];
test.quantify(testCases);
