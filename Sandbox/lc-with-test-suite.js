const { performance } = require("perf_hooks");

class Solution {
  method(s, k) {
    /*
    sliding window
    table to track unique chars and count
    track longest char
    expand right when char count within limit
    shrink left when char count exceeds limit
    */

    let l = 0;
    let mostFreqChar = s[0];
    let longestStrLen = 0;
    const charMap = {};
    for (let r = 0; r < s.length; r++) {
      const char = s[r];
      !charMap[char] ? (charMap[char] = 1) : charMap[char]++;

      if (charMap[char] > charMap[mostFreqChar]) mostFreqChar = char;

      const subStrLen = r - l + 1;
      const kNeeded = subStrLen - charMap[mostFreqChar];
      // Replacement met, set longest substring length
      if (k === kNeeded) longestStrLen = Math.max(longestStrLen, subStrLen);
      else if (k < kNeeded) {
        // Decrement count and shrink window
        charMap[s[l]]--;
        l++;
      }
    }

    return longestStrLen;
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
  ["ABAB", 2],
  ["AABABBA", 1],
];
test.quantify(testCases);
