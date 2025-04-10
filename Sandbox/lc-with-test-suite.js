const { performance } = require("perf_hooks");
const Deque = require("./deque");
const Heap = require("./heap");

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
  ...
*/
class Solution {
  method(tasks, n) {
    const charCount = {};
    for (const c of tasks) {
      charCount[c] = (charCount[c] || 0) + 1;
    }

    const heap = new Heap((a, b) => b - a);
    heap.heapify(Object.values(charCount));

    const q = new Deque();
    let time = 0;
    while (heap.size > 0 || q.size > 0) {
      time++;

      if (heap.size > 0) {
        const count = heap.pop() - 1;
        if (count !== 0) q.push([count, time + n]);
      }

      // Add back to heap after idle time
      if (q.size > 0 && q.peekLeft()[1] === time) heap.push(q.popLeft()[0]);
    }

    return time;
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
  [["A", "A", "A", "B", "B", "B"], 2],
  [["A", "C", "A", "B", "D", "B"], 1],
  [["A", "A", "A", "B", "B", "B"], 3],
  // Additional
  [["A", "A", "A", "B", "B", "B"], 0],
  [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 1],
  [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2],
];
test.quantify(testCases);
