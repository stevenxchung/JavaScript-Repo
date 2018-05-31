// Minimum
let min = (first, second) => {
  // If the first number is bigger return the other number else, return the first number
  if (first > second) {
    return second;
  } else {
    return first;
  }
}
// Test min()
min(1, 2)

// Recursion
let isEven = (n) => {
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  // if n is negative convert to a positive number and re-enter the function
  } else if (n < 0) {
    return isEven(-n);
  // Else, re-enter the function as n-2
  } else {
    return isEven(n-2);
  }
}
// Test isEven()
isEven(50);
isEven(75);
isEven(-1);

// Bean Counting
// Counts how many "B" are in a given string
let countBs = (string) => {
  let count = 0;
  for (var i = 0; i < string.length - 1; i++) {
    if (string[i] === "B") {
      count += 1;
    }
  }
  return count;
}
// Test countBs()
countBs("Better Business Bureau");

// Indicate the character that is to be counted
let countChar = (string, char) => {
  char = "";
  for (var i = 0; i < string.length - 1; i++) {
    return char = string[i];
  }
}
// Test countChar
countChar("Better Business Bureau");
