const { performance } = require("perf_hooks");

/*
  - Binary search by row then by values in row
  - Leverage sorted input values to compare target
*/
class Solution {
  method(matrix, target) {
    let COLS = matrix[0].length;
    // Find row where target could exist
    let targetRowIndex = null;
    for (const [i, row] of matrix.entries()) {
      if (target >= row[0] || target <= row[COLS - 1]) {
        targetRowIndex = i;
        break;
      }
    }

    // Target does not exist
    if (targetRowIndex === null) return false;

    // Proceed to binary search row
    let [l, r] = [0, COLS - 1];
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const row = matrix[targetRowIndex];
      if (row[mid] === target) return true;
      else if (row[mid] < target) r = mid - 1;
      else l = mid + 1;
    }

    return false;
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
  [
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3,
  ],
  [
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13,
  ],
];
test.quantify(testCases);
