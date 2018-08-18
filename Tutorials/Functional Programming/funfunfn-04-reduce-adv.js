// Recap: reduce() can be used to express any list transformation e.g. map(), filter(), reject(), etc.
// This lesson: reduce() is not limited to reducing arrays to numbers, it can do much more

// Example 1
import fs from 'fs';

let output = fs.readFileSync('data.txt');

console.log('output', output);
