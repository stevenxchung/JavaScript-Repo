/*
Given a string representing a math expression, return the result of the evaluated expression.

For example:
evaluate("1 + 2 + 3") => should return 6
evaluate("-32+-4") => should return -36

Assumptions:
- You can use Number(string) to convert numeric strings to numbers
- You can assume that the string will ONLY contain numbers (integers 0-9), spaces, and "+" or "-"
- You can assume that a "+" or "-" sign can be used as a math sign (negative, positive number) and a math operation

Goals of this exercise:
- You develop a succinct strategy or outline to discuss your approach on solving the problem. (code is just implementation detail, we want insight into your process and how you communicate in your code)

Off limits:
use of regex, eval
*/

const addToResult = (res, temp, negativeStack) => {
    // Determine outcome of all negatives
    let negativeRes = 1;
    while (negativeStack.length > 0) {
        negativeRes *= negativeStack.pop();
    }
    res += negativeRes * Number(temp);
    temp = "";

    return [res, temp];
}

const evaluate = (input) => {
    let res = 0;
    let temp = "";
    let negativeStack = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") continue;
        // Track negatives
        else if (input[i] === "-") {
            if (temp !== "") [res, temp] = addToResult(res, temp, negativeStack)
            negativeStack.push(-1);
        }
        else if (input[i] === "+") {
            [res, temp] = addToResult(res, temp, negativeStack)
        }
        // Input must be a number
        else temp += input[i];
    }

    if (temp !== "") {
        [res, temp] = addToResult(res, temp, negativeStack)
    }

    return res;
};

// Test cases
console.log(evaluate("1 + 2 + 3")); // 6
console.log(evaluate("-32+-4")); // -36
// Bonus
console.log(evaluate("-50--5")); // -45
console.log(evaluate("50--5")); // 55
