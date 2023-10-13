const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS to go through array and built tree
  - Preorder yields parent node
  - Inorder yields child nodes
*/
class Solution {
  method(preorder, inorder) {
    const dfs = (pre, inord) => {
      if (pre.length === 0 || inord.length === 0) return null;

      // Get parent node and shrink array
      const parentNode = pre.shift();
      // Get index to slice around
      const i = inord.indexOf(parentNode);
      const node = new TreeNode(parentNode);
      node.left = dfs(pre, inord.slice(0, i));
      node.right = dfs(pre, inord.slice(i + 1));

      return node;
    };

    return dfs(preorder, inorder);
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
    [3, 9, 20, 15, 7],
    [9, 3, 15, 20, 7],
  ],
  [[-1], [-1]],
];
test.quantify(testCases);
