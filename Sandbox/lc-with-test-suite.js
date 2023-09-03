const { performance } = require("perf_hooks");

class Solution {
  method(strings) {
    if (strings.length === 0) {
      return [""];
    }
    /*
    hashmap -> 26 char code, append to hashmap
    return hashmap values
    */

    const table = {};
    for (const s of strings) {
      const code = new Array(26).fill(0);
      for (const c of s) {
        code[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
      }
      const codeAsStr = code.join(",");
      if (!table[codeAsStr]) {
        table[codeAsStr] = [s];
      } else {
        table[codeAsStr].push(s);
      }
    }

    return Object.values(table);
  }

  reference() {}

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
const testCases = [["eat", "tea", "tan", "ate", "nat", "bat"], [""], ["a"]];
test.quantify(testCases);
