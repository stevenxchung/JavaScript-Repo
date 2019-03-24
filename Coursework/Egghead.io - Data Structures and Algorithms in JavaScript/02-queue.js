// Queue Data Structure in JavaScript

let createQueue = () => {
  const queue = [];
  return {
    // Add or enqueue
    enqueue(item) {
      queue.unshift(item);
    },
    // Remove or dequeue
    dequeue() {
      return queue.pop();
    },
    // Peek
    peek() {
      return queue[queue.length - 1];
    },
    // Length
    get length() {
      return queue.length;
    },
    // isEmpty
    isEmpty() {
      return queue.length == 0;
    }
  };
};

// Tests
// const q = createQueue();
// console.log(q.isEmpty());

// q.enqueue('First');
// q.enqueue('Second');
// q.enqueue('Third');

// // Check out the last element (first element added)
// console.log(q.peek());
// // Remove the last item from the queue
// q.dequeue();
// console.log(q.peek());
// q.dequeue();
// console.log(q.peek());
// q.dequeue();

// console.log(q.isEmpty());

module.exports = {
  createQueue
};
