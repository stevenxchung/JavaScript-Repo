// Stack Data Structure in JavaScript

let createStack = () => {
  const array = [];

  return {
    // Push
    push(item) {
      array.push(item);
    },
    // Pop
    pop() {
      return array.pop();
    },
    // Peek
    peek() {
      return array[array.length - 1];
    },
    // Length
    get length() {
      return array.length;
    },
    // isEmpty
    isEmpty() {
      return array.length == 0;
    }
  };
};

// Tests
const s = createStack();

s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);

console.log(s.peek());
s.pop();
console.log(s.peek());
console.log(s.length);
s.pop();
s.pop();
s.pop();
s.pop();
console.log(s.peek());
console.log(s.length);
