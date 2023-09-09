const { performance } = require("perf_hooks");

class Solution {
  _tableMatches(a, b) {
    return Object.keys(a).every((k) => a[k] === b[k]);
  }

  method(s1, s2) {
    /*
    two tables to track chars one for s1 and one for s2
    sliding window of size s1
    add and remove chars while sliding
    */
    let l = 0;
    // Build initial tables
    const [known, seen] = [{}, {}];
    for (const c of s1) {
      known[c] ? known[c]++ : (known[c] = 1);
    }
    seen[s2[l]] ? seen[s2[l]]++ : (seen[s2[l]] = 1);

    for (let r = 1; r < s2.length; r++) {
      const [c2l, c2r] = [s2[l], s2[r]];
      seen[c2r] ? seen[c2r]++ : (seen[c2r] = 1);
      if (this._tableMatches(known, seen)) return true;
      // Remove from table based on left pointer
      seen[c2l] > 1 ? seen[c2l]-- : (seen[c2l] = 0);
      l++;
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
  ["ab", "eidbaooo"],
  ["ab", "eidboaoo"],
  // Additional
  ["hello", "ooolleoooleh"],
];
test.quantify(testCases);
