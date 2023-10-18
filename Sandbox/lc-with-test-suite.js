const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on decision tree
  - Loop through each element but skip if seen
  - Track visited elements in a set, remove from set after recursion
  - Return if subset.length === nums.length
*/
class Solution {
  method(nums) {
    const res = [];
    const seen = new Set();

    const dfs = (subset) => {
      if (subset.length === nums.length) {
        res.push([...subset]);
        return;
      }

      for (const n of nums) {
        if (seen.has(n)) continue;
        seen.add(n);
        dfs([...subset, n]);
        seen.delete(n);
      }

      return;
    };

    dfs([]);
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
const testCases = [[1, 2, 3], [0, 1], [1]];
test.quantify(testCases);
