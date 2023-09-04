const { performance } = require("perf_hooks");

class Solution {
  method(board) {
    /* 
    need three table + sets
    table + set for tracking rows
    table + set for tracking columns
    table + set for tracking sub-grids
    */
    const rowsSeen = {};
    const colsSeen = {};
    const gridsSeen = {};

    const [ROWS, COLS] = [board.length, board[0].length];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const subGrid = `${Math.floor(r / 3)}${Math.floor(c / 3)}`;
        if (board[r][c] === ".") continue;
        if (
          rowsSeen[r]?.has(board[r][c]) ||
          colsSeen[c]?.has(board[r][c]) ||
          gridsSeen[subGrid]?.has(board[r][c])
        )
          return false;
        rowsSeen[r]
          ? rowsSeen[r].add(board[r][c])
          : (rowsSeen[r] = new Set(board[r][c]));
        colsSeen[c]
          ? colsSeen[c].add(board[r][c])
          : (colsSeen[c] = new Set(board[r][c]));
        gridsSeen[subGrid]
          ? gridsSeen[subGrid].add(board[r][c])
          : (gridsSeen[subGrid] = new Set(board[r][c]));
      }
    }

    return true;
  }

  _initBoard = (rows, cols) =>
    new Array(rows).fill().map(() => new Array(cols).fill(false));

  _getBoards = (boards) => {
    const [rows, cols] = [9, 9];

    return new Array(boards).fill().map(() => this._initBoard(rows, cols));
  };

  _searchGrid = (board, boxes, rows, cols) => {
    const [_rows, _cols] = [9, 9];

    for (let row = 0; row < _rows; row++) {
      /* Time O(ROWS)*/
      for (let col = 0; col < _cols; col++) {
        /* Time O(COLS)*/
        const char = board[row][col];
        const index = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        const isEmpty = char === ".";
        if (isEmpty) continue;

        const hasMoved =
          boxes[index][char - 1] || cols[col][char - 1] || rows[row][char - 1];
        if (hasMoved) return false;

        rows[row][char - 1] = true; /* Space O(ROWS * COLS)*/
        cols[col][char - 1] = true; /* Space O(ROWS * COLS)*/
        boxes[index][char - 1] = true; /* Space O(ROWS * COLS)*/
      }
    }

    return true;
  };

  reference(board) {
    const boards = 3;
    const [boxes, cols, rows] =
      this._getBoards(boards); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    return this._searchGrid(
      board,
      boxes,
      cols,
      rows
    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
  }

  quantify(testCases, runs = 1e5) {
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
  [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ],
  [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ],
];
test.quantify(testCases);
