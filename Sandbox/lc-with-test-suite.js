const { performance } = require("perf_hooks");

class Solution {
  method(height) {
    /*
    two pointers at ends of array
    determine max area at each step
    move pointers inward by lesser height
    */
    let [l, r] = [0, height.length - 1];
    let maxArea = 0;
    while (l < r) {
      const area = (r - l) * Math.min(height[l], height[r]);
      maxArea = Math.max(maxArea, area);
      if (height[l] < height[r]) l++;
      else r--;
    }

    return maxArea;
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
  [1, 8, 6, 2, 5, 4, 8, 3, 7],
  [1, 1],
];
test.quantify(testCases);
