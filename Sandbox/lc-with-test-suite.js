const { performance } = require("perf_hooks");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  - DFS on adjacent grid cells
  - Add/remove coordinates from set
  - Return if i = word.length - 1 and last letter matches
*/
class Solution {
  method(board, word) {
    const [ROWS, COLS] = [board.length, board[0].length];
    const seen = new Set();

    const dfs = (i, r, c) => {
      if (
        r >= ROWS ||
        r < 0 ||
        c >= COLS ||
        c < 0 ||
        seen.has(`${r}${c}`) ||
        board[r][c] !== word[i]
      )
        return false;
      if (i === word.length - 1 && board[r][c] === word[i]) return true;

      seen.add(`${r}${c}`);
      const res =
        dfs(i + 1, r + 1, c) ||
        dfs(i + 1, r - 1, c) ||
        dfs(i + 1, r, c + 1) ||
        dfs(i + 1, r, c - 1);
      seen.delete(`${r}${c}`);

      return res;
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (dfs(0, r, c)) return true;
      }
    }

    return false;
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
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED",
  ],
  [
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "SEE",
  ],
  [
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCB",
  ],
];
test.quantify(testCases);
