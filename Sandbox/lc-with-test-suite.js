const { performance } = require("perf_hooks");

/*
  - Use DFS to generate all possible combinations of parenthesis
  - Add "(" first and only add ")" if there are more ")" than "("
*/
class Solution {
  method(n) {
    const res = [];

    const dfs = (open, close, combo) => {
      if (open === 0 && close === 0) {
        res.push(combo);
        return;
      }

      // Prefer to add "(" first if available
      if (open > 0) dfs(open - 1, close, combo + "(");
      // Only add ")" parenthesis if there are more ")" than "("
      if (close > open) dfs(open, close - 1, combo + ")");

      return;
    };

    dfs(n, n, "");
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
const testCases = [3, 1];
test.quantify(testCases);
