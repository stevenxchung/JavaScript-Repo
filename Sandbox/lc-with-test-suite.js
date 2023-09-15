const { performance } = require("perf_hooks");

/*
  - k = max pile is always doable within the given hours so k = [1... max pile]
  - Instead of searching linearly [1... max pile], apply binary search on k range
  - Iterate over piles for each choice of k and compare time to finish
*/
class Solution {
  method(piles, h) {
    // Choices for k are from [1... max pile]
    let res = Math.max(...piles);
    let [l, r] = [1, res];
    while (l <= r) {
      let k = Math.floor((l + r) / 2);

      let timeToFinish = 0;
      for (const p of piles) {
        // Time to finish a pile = bananas in a pile over k rounded up
        timeToFinish += Math.ceil(p / k);
      }

      if (timeToFinish <= h) {
        res = Math.min(res, k);
        r = k - 1;
      } else {
        l = k + 1;
      }
    }

    return res;
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
  [[3, 6, 7, 11], 8],
  [[30, 11, 23, 4, 20], 5],
  [[30, 11, 23, 4, 20], 6],
  // Additional
  [[312884470], 312884469],
];
test.quantify(testCases);
