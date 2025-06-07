/*
Implement Inner Join Algorithm

You are given two tables T1 and T2, both represented as lists of integer lists. Each sublist represents a row, and all rows have the same number of columns. Each table's first column represents a key.

Write a function to perform an inner join on the first column of both tables.
For every pair of rows (row1, row2), where row1 is from T1 and row2 is from T2, if the first column of row1 equals the first column of row2, combine the rows into a single row and add it to the result.

The resulting row should:
- Start with the value of the matching key,
- Followed by all other columns of row1 (excluding the key),
- Then all other columns of row2 (excluding the key).

Return the resulting table as a list of rows. The order of output rows does not matter.

Constraints:
- Keys may not be unique
- Table dimensions may not be the same

Example:

T1 = [
    [1,2,3],
    [1,3,2], 
    [4,5,6], 
    [4,6,5], 
    [7,8,9]
]

T2 = [
    [4,1,1], 
    [1,10,11], 
    [1,12,13]
]

Output = [
    [4,5,6,1,1],
    [4,6,5,1,1],
    [1,2,3,10,11],
    [1,2,3,12,13],
    [1,3,2,10,11],
    [1,3,2,12,13]
]
*/

class Solution {
  method(table1, table2) {
    const columnMap = table1.reduce((acc, row) => {
      const key = row[0];
      acc[key] = acc[key] ?? [];
      acc[key].push(row.slice(1));
      return acc;
    }, {});

    const output = [];

    for (const row of table2) {
      const key = row[0];
      if (!(key in columnMap)) continue;
      for (const cols of columnMap[key]) {
        output.push([key, ...cols, ...row.slice(1)]);
      }
    }

    return output;
  }

  quantify(testCases, runs = 1e5) {
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
  }
}

const test = new Solution();
const testCases = [
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [4, 1, 1],
      [1, 10, 11],
      [1, 12, 13],
    ],
  ],
  [
    [
      [1, 2, 3],
      [1, 3, 2],
      [4, 5, 6],
      [4, 6, 5],
      [7, 8, 9],
    ],
    [
      [4, 1, 1],
      [1, 10, 11],
      [1, 12, 13],
    ],
  ],
];
test.quantify(testCases);
