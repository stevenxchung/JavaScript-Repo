import { performance } from "perf_hooks";

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  isPalindrome(s: string): boolean {
    let [l, r] = [0, s.length - 1];
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  method(s: string): string[][] {
    const res: string[][] = [];

    const dfs = (i: number, arr: string[]) => {
      if (i >= s.length) {
        res.push([...arr]);
        return;
      }

      for (let j = i; j < s.length; j++) {
        if (!this.isPalindrome(s.slice(i, j + 1))) continue;
        dfs(j + 1, [...arr, s.slice(i, j + 1)]);
      }
    };

    dfs(0, []);
    return res;
  }

  reference(obj: any): any {}

  quantify(testCases: any[], runs: number = 1e5): void {
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

    // const refStart = performance.now();
    // runsArr.map((_, i) => {
    //   testCases.map((input) => {
    //     if (i === 0) console.log(this.reference(input));
    //     else this.reference(input);
    //   });
    // });
    // console.log(
    //   `Runtime for reference: ${(performance.now() - refStart) / 1000}`
    // );
  }
}

const test = new Solution();
const testCases = ["aab", "a"];
test.quantify(testCases);
