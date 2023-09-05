const { performance } = require("perf_hooks");

class Solution {
  _encode(input) {
    return input.join("#");
  }

  _decode(input) {
    return input.split("#");
  }

  method(input) {
    const encoded = this._encode(input);
    const decoded = this._decode(encoded);
    return [encoded, decoded];
  }

  reference() {}

  quantify(testCases, runs = 1e6) {
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
  ["lint", "code", "love", "you"],
  ["we", "say", ":", "yes"],
];
test.quantify(testCases);
