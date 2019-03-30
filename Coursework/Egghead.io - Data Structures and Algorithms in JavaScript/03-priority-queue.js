// Priority Queue JavaScript Data Structure
// We can make a priority queue by using two queues, a high and low priority queue

const { createQueue } = require('./02-queue');

let createPriorityQueue = () => {
  const lowPriorityQueue = createQueue();
  const highPriorityQueue = createQueue();

  return {
    // Enqueue
    enqueue(item, isHighPriority = false) {
      isHighPriority
        ? highPriorityQueue.enqueue(item)
        : lowPriorityQueue.enqueue(item);
    },
    // Dequeue
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue();
      }

      return lowPriorityQueue.dequeue();
    },
    // Peek
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek();
      }

      return lowPriorityQueue.peek();
    },
    // Length
    length() {
      return highPriorityQueue.length + lowPriorityQueue.length;
    },
    // isEmpty
    isEmpty() {
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty();
    }
  };
};

// Tests
const q = createPriorityQueue();

q.enqueue('First');
q.enqueue('Second');
q.enqueue('Third');

q.dequeue();
q.enqueue('Code Red!', true);
console.log(q.dequeue());
console.log(q.peek());
