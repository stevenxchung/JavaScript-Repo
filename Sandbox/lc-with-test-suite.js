const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on decision tree
  - Increase partition size via loop
  - Check if new substring a palindrome
  - Return if i >= s.length
*/
class Solution {
  isPalindrome(s) {
    let [l, r] = [0, s.length - 1];
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  method(s) {
    const res = [];

    const dfs = (i, arr) => {
      if (i >= s.length) {
        res.push([...arr]);
        return;
      }

      for (let j = i; j < s.length; j++) {
        if (!this.isPalindrome(s.slice(i, j + 1))) continue;
        dfs(j + 1, [...arr, s.slice(i, j + 1)]);
      }
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
const testCases = ["aab", "a"];
test.quantify(testCases);
