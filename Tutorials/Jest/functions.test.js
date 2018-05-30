const functions = require('./functions');

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// beforeAll(() => initDatabase());
// afterAll(() => closeDatabase());

// const initDatabase = () => console.log("Database Initialized...");
// const closeDatabase = () => console.log("Database Closed...");

// Running initialization files
const nameCheck = () => console.log("Checking Name...");

describe("Checking names", () => {
    beforeEach(() => nameCheck());

    test("User is Steven", () => {
        const user = "Steven";
        expect(user).toBe("Steven");
    });

    test("User is XYZ", () => {
        const user = "XYZ";
        expect(user).toBe("XYZ");
    });
});

// toBe()
test("Adds 2 + 2 to equal 4", () => {
    expect(functions.add(2, 2)).toBe(4);
});

// not.toBe()
test("Adds 2 + 2 to NOT equal 5", () => {
    expect(functions.add(2, 2)).not.toBe(5);
});

// toBeNull()
test("Should be null", () => {
    expect(functions.isNull()).toBeNull();
});

// toBeFalsy()
test("Should be falsy", () => {
    expect(functions.checkValue(undefined)).toBeFalsy();
});

// toEqual()
test("User should be Steven Chung object", () => {
    expect(functions.createUser()).toEqual({
        firstName: "Steven",
        lastName: "Chung"
    });
});

// toBeLessThan(), toBeGreaterThan()
test("Should be under 1600", () => {
    const load1 = 800;
    const load2 = 800;
    expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// Regex
test("There is no I in team", () => {
    expect("team").not.toMatch(/I/i);
});

// Arrays
test("Admin should be in usernames", () => {
    usernames = ["Bob", "Cathy", "Admin"];
    expect(usernames).toContain("Admin");
});

// Working with async data
// test("User fetched name should be Leanne Graham", () => {
//     expect.assertions(1);
//     return functions.fetchUser().then(data => {
//         expect(data.name).toEqual("Leanne Graham");
//     });
// });

// Async await
test("User fetched name should be Leanne Graham", async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual("Leanne Graham");
});
