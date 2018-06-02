// Sum of a range
let range = (start, end, step = 1) => {
  let arr = [];
  if (step > 0) {
    for (var i = start; i <= end; i += step) {
      arr.push(i);
    }
  } else {
    for (var i = start; i >= end; i += step) {
      arr.push(i);
    }
  }
  return arr;
}
// Test range()
range(1, 10);

// Sum an array of numbers
let sum = (arr) => {
  let total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
// Test sum()
sum(range(1, 10))
