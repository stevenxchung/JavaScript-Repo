const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - Use in-order DFS to traverse tree
  - Track values in an array and return when array length = k
  - The kth smallest value is the last value in the array
*/
class Solution {
  method(root, k) {
    const res = [];

    const dfs = (node) => {
      if (!node || res.length === k) return;

      dfs(node.left);
      // Only add to array if length < k
      if (res.length < k) res.push(node.val);
      dfs(node.right);

      return;
    };

    dfs(root);
    return res.pop();
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
  [new TreeNode(3, new TreeNode(1, null, new TreeNode(2)), new TreeNode(4)), 1],
  [
    new TreeNode(
      5,
      new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
      new TreeNode(6)
    ),
    3,
  ],
];
test.quantify(testCases);
