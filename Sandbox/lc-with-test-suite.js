const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS but traversing right side first
  - Use set to track if level already visited
*/
class Solution {
  method(root) {
    const res = [];
    const seen = new Set();
    const dfs = (node, level) => {
      if (!node || seen.has(level)) return;

      seen.add(level);
      res.push(node.val);
      dfs(node.right, level + 1);
      dfs(node.left, level + 1);

      return;
    };

    dfs(root, 0);
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
  new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, new TreeNode(4))
  ),
  new TreeNode(1, null, new TreeNode(3)),
  null,
];
test.quantify(testCases);
