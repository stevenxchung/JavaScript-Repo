// Recap: reduce() can be used to express any list transformation e.g. map(), filter(), reject(), etc.
// This lesson: reduce() is not limited to reducing arrays to numbers, it can do much more

// Example 1
import fs from 'fs';
// Need to map to encoder
let output = fs.readFileSync('data.txt');

console.log('output', output);

// Example 2
import fs from 'fs';
// Setting up for reduce
let output = fs
  .readFileSync('data.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'));

console.log('output', output);

// Example 3
import fs from 'fs';
// Add reduce()
let output = fs
  .readFileSync('data.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((customers, line) => {
    customers[line[0]] = customers[line[0]] || [];
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3]
    });
    return customers;
  }, {});

console.log('output', JSON.stringify(output, null, 2));
