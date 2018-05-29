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
  // Must check for both conditions first or else program will skip this condition
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
  // If odd
  if (row % 2 !== 0) {
    // Generate pattern for odds
    for (var i = 0; i < size/2; i++) {
      odds += spaceChar + hashChar;
    }
    // Log then reset odds pattern for next loop
    console.log(odds);
    odds = "";
  } else {
    // Generate pattern for evens
    for (var i = 0; i < size/2; i++) {
      evens += hashChar + spaceChar;
    }
    // Log then reset evens pattern for next loop
    console.log(evens);
    evens = "";
  }
}

// Chessboard (Any Size Alternate Solution)
var hashChar = "#";
var spaceChar = " ";
var odds = "";
var evens = "";
var size = 8;
// Generate rows
for (var row = 1; row <= size; row++) {
  // Generate columns
  for (var col = 0; col < size/2; col++) {
    if (row % 2 !== 0) {
      // Generate pattern for odds
      odds += spaceChar + hashChar;
    } else {
      // Generate pattern for evens
      evens += hashChar + spaceChar;
    }
  }
  // Skip empty lines
  if (odds === "" || evens === "") {
    continue;
  }
  // Log then reset odds pattern for next loop
  console.log(odds);
  odds = "";
  // Log then reset evens pattern for next loop
  console.log(evens);
  evens = "";
}

// Chessboard (Any Size Refactor)
var chessArr = "";
for (var row = 0; row < 8; row++) {
  for (var col = 0; col < 8; col++) {
    if ((row + col) % 2 === 0) {
      chessArr += " ";
    } else {
      chessArr += "#";
    }
  }
  chessArr += "\n";
}
console.log(chessArr);
console.log(chessArr.length);
