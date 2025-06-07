/*
Airbnb's Split Stays feature allows users to split a longer stay between two different listings. This feature is designed for bookings of at least one week and up to six months. Each split stay pairs two consecutive stays for the span of your dates, allowing you to explore different locations or even different destinations during your trip.

Given a split stay consists of two distinct Airbnb listings (X, Y) such that:
- Listing X covers a contiguous prefix of desiredDates
- Listing Y covers the remaining suffix
- Combined, both listings together cover all dates in desiredDates, with no gaps or overlaps
- The two listings must be different

A dictionary availability mapping Airbnb listing IDs (as uppercase strings) to sorted lists of integers, each representing available dates.

availability = {
    'A': [1, 2, 3, 4],
    'B': [5, 6, 7],
    'C': [1, 2, 3, 4, 5, 6],
    'D': [7],
}

A list of desiredDates, which contains a sorted, consecutive range of integers representing the user's full reservation request.

desiredDates = [1, 2, 3, 4, 5, 6, 7]

Return a list of all valid (X, Y) pairs (as tuples of strings) that satisfy the above conditions. You may return the pairs in any order.
*/

class Solution {
  isSubsetMatch(arr, subset) {
    const maxStart = arr.length - subset.length;
    for (let start = 0; start <= maxStart; start++) {
      const window = arr.slice(start, start + subset.length);
      const isMatch = window.every((val, i) => val === subset[i]);
      if (isMatch) return true;
    }
    return false;
  }

  method(availability, desiredDates) {
    const keys = Object.keys(availability);
    const validSplitPairs = new Set();
    for (let a = 0; a < keys.length; a++) {
      for (let b = a + 1; b < keys.length; b++) {
        for (let i = 1; i < desiredDates.length; i++) {
          const part1 = desiredDates.slice(0, i);
          const part2 = desiredDates.slice(i);
          const propA = availability[keys[a]];
          const propB = availability[keys[b]];
          if (
            !validSplitPairs.has(JSON.stringify([keys[a], keys[b]])) &&
            this.isSubsetMatch(propA, part1) &&
            this.isSubsetMatch(propB, part2)
          )
            validSplitPairs.add(JSON.stringify([keys[a], keys[b]]));
        }
      }
    }

    return Array.from(validSplitPairs).map(JSON.parse);
  }

  quantify(testCases, runs = 1e4) {
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
  [{ A: [1, 2, 3, 4, 7, 9], B: [1, 5, 6, 7] }, [1, 2, 3, 4, 5, 6, 7]],
  [
    {
      A: [1, 2, 3, 4],
      B: [5, 6, 7],
      C: [1, 2, 3, 4, 5, 6],
      D: [7],
    },
    [1, 2, 3, 4, 5, 6, 7],
  ],
  [
    {
      A: [1, 2, 3],
      B: [6, 7],
      C: [2, 3, 4],
    },
    [1, 2, 3, 4, 5, 6, 7],
  ],
  [
    {
      A: [1, 2, 3, 4],
      B: [5, 6, 7],
      C: [1, 2, 3, 4, 5],
      D: [6, 7],
      E: [3, 4, 5, 6, 7],
    },
    [1, 2, 3, 4, 5, 6, 7],
  ],
];
test.quantify(testCases);
