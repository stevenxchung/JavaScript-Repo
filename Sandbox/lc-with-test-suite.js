const { performance } = require("perf_hooks");

class Solution {
  method(numbers, target) {
    let [l, r] = [0, numbers.length - 1];
    while (l < r) {
      const res = numbers[l] + numbers[r];
      if (res > target) r -= 1;
      else if (res < target) l += 1;
      else return [l + 1, r + 1];
    }
  }

  reference(numbers, target) {
    let [left, right] = [0, numbers.length - 1];

    while (left < right) {
      const sum = numbers[left] + numbers[right];

      const isTarget = sum === target;
      if (isTarget) return [left + 1, right + 1];

      const isTargetGreater = sum < target;
      if (isTargetGreater) left++;

      const isTargetLess = target < sum;
      if (isTargetLess) right--;
    }

    return [-1, -1];
  }

  quantify(testCases, runs = 100000) {
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
  [[2, 7, 11, 15], 9],
  [[2, 3, 4], 6],
  [[-1, 0], -1],
];
test.quantify(testCases);
