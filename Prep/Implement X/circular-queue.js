class Queue {
  constructor({ capacity = 1 }) {
    this.capacity = capacity;
    this.queue = new Array(this.capacity).fill(null);
    // Left is the start of the queue
    this.left = this.capacity - 1;
    // Right is the end of the queue
    this.right = this.capacity - 1;
    this.size = 0;
  }

  _push(val) {
    this.queue[this.left] = val;
    this.left = (this.left - 1 + this.capacity) % this.capacity;
    this.size++;
  }

  push(val) {
    if (this.isHalfFull()) {
      console.log(`push(${val}): HALF FULL, adding capacity...`);
      this.capacity *= 2;
      const temp = this.toArray();
      this.clear();
      while (temp.length > 0) {
        this._push(temp.pop());
      }
    }
    this._push(val);

    console.log(`push(${val})`);
  }

  pop() {
    if (this.isEmpty()) {
      console.log(`pop(): EMPTY, no elements deleted`);
      return;
    }

    const front = this.queue[this.right];
    this.queue[this.right] = null;
    this.right = (this.right - 1 + this.capacity) % this.capacity;
    this.size--;

    console.log(`pop(): ${front}`);
    return front;
  }

  peek() {
    const res = this.queue[this.right];
    console.log(`peek(): ${res}`);
    return res;
  }

  isEmpty() {
    return this.size === 0;
  }

  isHalfFull() {
    return this.size >= Math.round(this.capacity / 2);
  }

  clear() {
    this.queue = new Array(this.capacity).fill(null);
    this.left = this.capacity - 1;
    this.right = this.capacity - 1;
    this.size = 0;
    console.log("clear()");
  }

  toArray() {
    const res = Array.from(
      { length: this.size },
      (_, i) => this.queue[(this.left + 1 + i) % this.capacity]
    );

    console.log(`toArray(): ${res}`);
    return res;
  }
}

const test = new Queue({ capacity: 10 });
console.log(`size: ${test.size}`);
test.push(1);
test.push(2);
test.push(3);
test.push("4");
test.push("5");
test.push("6");
test.push(7);
test.push(8);
test.push(9);
console.log(`size: ${test.size}`);
test.toArray();
test.clear();
test.toArray();
console.log(`size: ${test.size}`);
test.push("a");
test.peek();
test.pop();
test.push("b");
test.peek();
test.pop();
test.push("c");
test.peek();
test.pop();
test.push("x");
test.push("y");
test.push("z");
test.peek();
console.log(`size: ${test.size}`);
test.toArray();
