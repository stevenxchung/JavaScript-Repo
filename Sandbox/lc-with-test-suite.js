const { performance } = require("perf_hooks");

class Solution {
  method(nums, k) {
    /* 
    table {number : count}
    loop table -> insert into heap
    */
    const res = [];
    const table = {};
    const bucket = Array.from({ length: nums.length + 1 }, () => []);

    for (const n of nums) {
      table[n] = table[n] ? table[n] + 1 : 1;
    }

    for (const [n, count] of Object.entries(table)) {
      bucket[count].push(n);
    }

    for (let i = bucket.length - 1; i >= 0; i--) {
      if (bucket[i].length > 0) bucket[i].map((e) => res.push(e));
      if (k === res.length) return res;
    }
  }

  reference() {}

  quantify(testCases, runs = 100000) {
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
  [[1, 1, 1, 2, 2, 3], 2],
  [[1], 1],
];
test.quantify(testCases);
