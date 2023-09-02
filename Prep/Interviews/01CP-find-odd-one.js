/*
*Custom problem
Given a series of strings, find the string where the distances between each neighboring character in the string is different from the rest of the strings.
*/
const { performance } = require("perf_hooks");

class Solution {
  method(strs) {
    // Need two hashmaps to determine which string is the odd one
    const counts = {};
    const dists = {};
    for (const s of strs) {
      let [i, j] = [0, 1];
      let char_dist = [];
      while (j < s.length) {
        char_dist.push(s[i].charCodeAt(0) - s[j].charCodeAt(0));
        i += 1;
        j += 1;
      }
      const id = char_dist.toString();
      if (!(id in counts)) {
        counts[id] = 1;
        dists[id] = s;
      } else {
        counts[id] += 1;
      }
    }
    // The key with the minimum count is the odd one
    const [minItems] = Object.entries(counts).sort(([, v1], [, v2]) => {
      return v1 - v2;
    });
    return dists[minItems[0]];
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
  }
}

const test = new Solution();
const testCases = [["ABC", "DEF", "GHI", "QWE"]];
test.quantify(testCases);
