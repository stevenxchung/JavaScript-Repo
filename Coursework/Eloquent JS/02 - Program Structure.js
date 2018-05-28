// Looping a triangle
var count = "";
var stringHash = "#######";
for (var i = 0; i < stringHash.length; i++) {
  count += stringHash[i];
  console.log(count);
}

// FizzBuzz
var nums = [...Array(101).keys()];
// var nFizzBuzz = 0,
//     nFizz = 0,
//     nBuzz = 0;
for (var i = 1; i < nums.length; i++) {
  if (i % 3 == 0 && i % 5 === 0) {
    console.log("FizzBuzz");
    // nFizzBuzz += 1;
  } else if (i % 3 === 0) {
    console.log("Fizz");
    // nFizz += 1;
  } else if (i % 5 === 0) {
    console.log("Buzz");
    // nBuzz += 1;
  } else {
    console.log(i);
  }
}

// Chessboard
var odds = " # # # #";
var evens = "# # # # ";
for (var i = 1; i < 9; i++) {
  // If odd
  if (i % 2 !== 0) {
    console.log(odds);
  } else {
    console.log(evens);
  }
}

// Chessboard (Any Size)
var hashChar = "#";
var spaceChar = " ";
var odds = "";
var evens = "";
var size = 8;
for (var row = 1; row <= size; row++) {
  if (row % 2 !== 0) {
    for (var i = 0; i < size/2; i++) {
      odds += spaceChar + hashChar;
    }
    console.log(odds);
    odds = "";
  } else {
    for (var i = 0; i < size/2; i++) {
      evens += hashChar + spaceChar;
    }
    console.log(evens);
    evens = "";
  }
}
