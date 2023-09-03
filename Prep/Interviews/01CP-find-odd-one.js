/*
*Custom problem
Given a series of strings, find the string where the distances between each neighboring character in the string is different from the rest of the strings.
*/
const { performance } = require("perf_hooks");

class Solution {
  _calculateDistances(s) {
    const distances = [];
    for (let i = 1; i < s.length; i++) {
      distances.push(Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1)));
    }
    return distances.join(",");
  }

  method(strings) {
    // Use a hashmap to determine which string is the odd one
    const table = {}; // { distance: { count, string } }
    for (const s of strings) {
      const charDist = this._calculateDistances(s);
      if (!(charDist in table)) {
        table[charDist] = { count: 1, string: s };
      } else {
        table[charDist].count++;
      }
    }
    // The key with the minimum count is the odd one
    for (const k in table) {
      if (table[k].count === 1) return table[k].string;
    }

    return null;
  }

  reference(strings) {
    const distCountMap = {};

    for (const s of strings) {
      const dist = this._calculateDistances(s);

      if (!distCountMap[dist]) {
        distCountMap[dist] = { count: 1, s };
      } else {
        distCountMap[dist].count++;
      }
    }

    for (const dist in distCountMap) {
      if (distCountMap[dist].count === 1) {
        return distCountMap[dist].s;
      }
    }

    return null;
  }

  quantify(testCases, runs = 100000) {
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
  ["ABC", "DEF", "GHI", "QWE"],
  ["QWE", "ABC", "DEF", "GHI"],
];
test.quantify(testCases);
