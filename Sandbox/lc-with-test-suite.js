const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS and compare current node with greatest node seen on path so far
*/
class Solution {
  method(root) {
    let count = 0;

    const dfs = (node, prev) => {
      if (!node) return;
      if (node.val >= prev) {
        count++;
        prev = node.val;
      }

      dfs(node.left, prev);
      dfs(node.right, prev);

      return;
    };

    dfs(root, root.val);
    return count;
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
    3,
    new TreeNode(1, new TreeNode(3)),
    new TreeNode(4, new TreeNode(1), new TreeNode(5))
  ),
  new TreeNode(3, new TreeNode(3, new TreeNode(4), new TreeNode(2))),
  new TreeNode(1),
];
test.quantify(testCases);
