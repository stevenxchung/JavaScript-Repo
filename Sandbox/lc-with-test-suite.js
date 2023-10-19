const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on decision tree with sorted input
  - Return when target reached
  - Skip if candidate same as previous
  - Break out of loop if total will be greater than target
*/
class Solution {
  method(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];

    const dfs = (i, subset, total) => {
      if (total === target) {
        res.push([...subset]);
        return;
      }

      for (let j = i; j < candidates.length; j++) {
        // Skip if candidate matches previous
        if (i != j && candidates[j] === candidates[j - 1]) continue;
        if (total + candidates[j] > target) break;
        // Next index must be different from previous
        dfs(j + 1, [...subset, candidates[j]], total + candidates[j]);
      }

      return;
    };

    dfs(0, [], 0);
    return res;
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
  [[10, 1, 2, 7, 6, 1, 5], 8],
  [[2, 5, 2, 1, 2], 5],
];
test.quantify(testCases);
