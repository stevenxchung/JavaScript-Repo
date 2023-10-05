const { performance } = require("perf_hooks");

/*
  - Determine when each car will reach destination (target = speed * t + start)
  - Add time-to-target to stack but pop if next car is slower or same speed as previous car
*/
class Solution {
  method(target, position, speed) {
    const stack = [];

    for (let i = 0; i < position.length; i++) {
      const t = (target - position[i]) / speed[i];
      // Car behind cannot overtake car in front
      if (stack && stack[stack.length - 1] <= t) stack.pop();
      else stack.push(t);
    }

    return stack.length;
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
  [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
  [10, [3], [3]],
  [100, [0, 2, 4], [4, 2, 1]],
];
test.quantify(testCases);
