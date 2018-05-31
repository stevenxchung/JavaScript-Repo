// Minimum
let min = (first, second) => {
  // If the first number is bigger return the other number else, return the first number
  if (first > second) {
    return second;
  } else {
    return first;
  }
}

min(1, 2)

// Recursion
let isEven = (n) => {
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  } else if (n < 0) {
    return isEven(-n);
  } else {
    return isEven(n-2);
  }
}
isEven(50);
isEven(75);
isEven(-1);
