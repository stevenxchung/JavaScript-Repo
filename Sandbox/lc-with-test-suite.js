const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on combinations of characters based on digit
  - Hashmap of digits (2-9) to characters
  - Loop through each character based on digit
  - Add combination to result and return if i >= digits.length
*/
class Solution {
  method(digits) {
    const res = [];
    if (digits.length === 0) return res;

    const table = {
      2: "abc",
      3: "def",
      4: "ghi",
      5: "jkl",
      6: "mno",
      7: "pqrs",
      8: "tuv",
      9: "wxyz",
    };

    const dfs = (i, substr) => {
      if (i >= digits.length) {
        res.push(substr);
        return;
      }

      for (const c of table[digits[i]]) {
        dfs(i + 1, substr + c);
      }

      return;
    };

    dfs(0, "");
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
const testCases = ["23", "", "2"];
test.quantify(testCases);
