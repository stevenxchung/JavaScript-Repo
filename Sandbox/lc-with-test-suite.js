const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on decision tree (add candidate to subset or skip)
  - Return if total > target or i >= candidates.length
  - Add to result and return if total === target
*/
class Solution {
  method(candidates, target) {
    const res = [];

    const dfs = (i, subset, total) => {
      if (total > target || i >= candidates.length) return;
      if (total === target) {
        res.push([...subset]);
        return;
      }

      subset.push(candidates[i]);
      dfs(i, subset, total + candidates[i]);
      subset.pop();
      dfs(i + 1, subset, total);

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
  [[2, 3, 6, 7], 7],
  [[2, 3, 5], 8],
  [[2], 1],
];
test.quantify(testCases);
