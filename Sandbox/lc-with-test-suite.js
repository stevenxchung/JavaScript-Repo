const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on decision tree to add or skip element
  - One path includes nums[i] and another does not
  - Return when i === nums.length
*/
class Solution {
  method(nums) {
    nums.sort();
    const res = [];

    const dfs = (i, subset) => {
      if (i === nums.length) {
        res.push([...subset]);
        return;
      }

      // Subsets that include nums[i]
      subset.push(nums[i]);
      dfs(i + 1, subset);
      subset.pop();
      // Subsets that skip nums[i]
      while (i + 1 < nums.length && nums[i] === nums[i + 1]) i++;
      dfs(i + 1, subset);

      return;
    };

    dfs(0, []);
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
const testCases = [[1, 2, 2], [0]];
test.quantify(testCases);
