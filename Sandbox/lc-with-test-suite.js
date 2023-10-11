const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS to determine if subtree is BST
  - A tree with a single node is a BST
  - Treat left or right value as previous node value
  - Left and right nodes must be strictly < or > than current node
*/
class Solution {
  method(root) {
    const isBST = (node, left, right) => {
      if (!node) return true;
      if (left >= node.val || node.val >= right) return false;

      return (
        isBST(node.left, left, node.val) && isBST(node.right, node.val, right)
      );
    };

    return isBST(root, -Number.MAX_VALUE, Number.MAX_VALUE);
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
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(
    5,
    new TreeNode(1),
    new TreeNode(4, new TreeNode(3), new TreeNode(6))
  ),
];
test.quantify(testCases);
