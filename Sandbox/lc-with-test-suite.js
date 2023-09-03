const { performance } = require("perf_hooks");

class Solution {
  method(nums) {
    /* 
    prefix and postfix = 1
    loop forward and store in output
    loop backward and store in output
    */
    const res = new Array(nums.length).fill(1);
    let pre = 1;
    for (let i = 1; i < nums.length; i++) {
      res[i] = pre * nums[i - 1];
      pre = res[i];
    }

    let post = 1;
    for (let i = nums.length - 2; i >= 0; i--) {
      post *= nums[i + 1];
      res[i] *= post;
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
  [1, 2, 3, 4],
  [-1, 1, 0, -3, 3],
];
test.quantify(testCases);
