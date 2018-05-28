const reverseString = require("./reverseString");

// toBeDefined()
test("reverseString function exists", () => {
    expect(reverseString).toBeDefined();
});

// toEqual()
test("String reverses", () => {
    expect(reverseString("hello")).toEqual("olleh");
});

// toEqual()
test("String reverses with uppercase", () => {
    expect(reverseString("Hello")).toEqual("olleh");
});