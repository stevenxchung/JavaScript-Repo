const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - Use BFS for level-order traversal
  - Optimize using temp array for storing next level to avoid using shift()
*/
class Solution {
  method(root) {
    const res = [];
    if (!root) return res;

    let q = [root];
    while (q.length > 0) {
      const [temp, next] = [[], []];
      for (const node of q) {
        if (node.left) next.push(node.left);
        if (node.right) next.push(node.right);
        temp.push(node.val);
      }
      res.push(temp);
      q = next;
    }

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
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
  ),
  new TreeNode(1),
  null,
];
test.quantify(testCases);
