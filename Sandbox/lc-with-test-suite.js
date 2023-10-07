const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - BST has left node less than current and right node greater than current
  - Use DFS, go left when p and q < node and right when p and q > node
*/
class Solution {
  method(root, p, q) {
    const dfs = (node) => {
      if (p.val < node.val && q.val < node.val) return dfs(node.left);
      if (p.val > node.val && q.val > node.val) return dfs(node.right);
      return node.val;
    };

    return dfs(root);
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
    new TreeNode(
      6,
      new TreeNode(
        2,
        new TreeNode(0),
        new TreeNode(4, new TreeNode(3), new TreeNode(5))
      ),
      new TreeNode(8, new TreeNode(7), new TreeNode(9))
    ),
    new TreeNode(2),
    new TreeNode(8),
  ],
  [
    new TreeNode(
      6,
      new TreeNode(
        2,
        new TreeNode(0),
        new TreeNode(4, new TreeNode(3), new TreeNode(5))
      ),
      new TreeNode(8, new TreeNode(7), new TreeNode(9))
    ),
    new TreeNode(2),
    new TreeNode(4),
  ],
  [new TreeNode(2, new TreeNode(1)), new TreeNode(2), new TreeNode(1)],
  // Additional
  [
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(3),
    new TreeNode(1),
  ],
  [
    new TreeNode(3, new TreeNode(1, null, new TreeNode(2)), new TreeNode(4)),
    new TreeNode(2),
    new TreeNode(4),
  ],
];
test.quantify(testCases);
