const isAnagram = require("./anagram");

// toEqual()
test("isAnagram function exists", () => {
    expect(typeof isAnagram).toEqual("function");
});

// toBeTruthy()
test("'Cinema' is an anagram of 'Iceman'", () => {
    expect(isAnagram("Cinema", "Iceman")).toBeTruthy();
});

// toBeTruthy()
test("'Dormitory' is an anagram of 'dirty room##'", () => {
    expect(isAnagram("Dormitory", "dirty room##")).toBeTruthy();
});

// not.toBeTruthy()
test("'Hello' is not an anagram of 'Alhoa'", () => {
    expect(isAnagram("hello", "Aloha")).not.toBeTruthy();
});

// not.toBeTruthy()
test("'123' is an anagram of '321'", () => {
    expect(isAnagram("123", "321")).toBeTruthy();
});