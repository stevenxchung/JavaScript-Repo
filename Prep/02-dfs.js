const { performance } = require('perf_hooks');

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  inorder = [];
  preorder = [];
  postorder = [];

  method(node) {
    this.inorderDFS(node);
    this.preorderDFS(node);
    this.postorderDFS(node);

    return [this.inorder, this.preorder, this.postorder];
  }

  inorderDFS(node) {
    if (!node) return;
    this.inorderDFS(node.left);
    this.inorder.push(node.val);
    this.inorderDFS(node.right);
  }

  preorderDFS(node) {
    if (!node) return;
    this.preorder.push(node.val);
    this.preorderDFS(node.left);
    this.preorderDFS(node.right);
  }

  postorderDFS(node) {
    if (!node) return;
    this.postorderDFS(node.left);
    this.postorderDFS(node.right);
    this.postorder.push(node.val);
  }

  reference() {
    return null;
  }

  quantify(testCases, runs = 100000) {
    const runsArr = Array.from({ length: runs });
    const solStart = performance.now();
    runsArr.map((run, i) => {
      testCases.map((input) => {
        if (i === 0) console.log(this.method(input));
        else this.method(input);
      });
    });
    console.log(
      `Runtime for solution: ${(performance.now() - solStart) / 1000}\n`
    );

    const refStart = performance.now();
    runsArr.map((run, i) => {
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
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
  ),
];
test.quantify(testCases);
