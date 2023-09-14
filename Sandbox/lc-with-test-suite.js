const { performance } = require("perf_hooks");

/*
  - Use stack to track element order
  - When operator detected, perform operation on top two elements
  - Add back result to top of stack
  - When input is fully indexed, answer is on top of stack
*/
class Solution {
  method(tokens) {
    const stack = [];
    for (const t of tokens) {
      if (t !== "+" && t !== "-" && t !== "*" && t !== "/") {
        stack.push(t);
        continue;
      }

      const [a, b] = [stack.pop(), stack.pop()];
      switch (t) {
        case "+":
          stack.push(parseInt(a) + parseInt(b));
          break;
        case "-":
          stack.push(parseInt(b) - parseInt(a));
          break;
        case "*":
          stack.push(parseInt(a) * parseInt(b));
          break;
        case "/":
          stack.push(parseInt(b) / parseInt(a));
          break;
      }
    }

    return stack.length > 0 ? stack[0] : null;
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
  ["2", "1", "+", "3", "*"],
  ["4", "13", "5", "/", "+"],
  ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
];
test.quantify(testCases);
