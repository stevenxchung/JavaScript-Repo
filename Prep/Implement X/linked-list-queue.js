class Node {
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Queue {
  constructor() {
    // Head is the start of the queue (oldest elements)
    this.head = new Node();
    // Tail is the end of the queue (newest elements)
    this.tail = new Node();
    [this.tail.right, this.head.left] = [this.head, this.tail];

    this.size = 0;
  }

  push(val) {
    const node = new Node(val);
    const first = this.tail.right;
    [first.left, node.right] = [node, first];
    [this.tail.right, node.left] = [node, this.tail];
    this.size++;

    console.log(`push(${val})`);
  }

  pop() {
    const last = this.head.left;
    const beforeLast = last.left;
    [beforeLast.right, this.head.left] = [this.head, beforeLast];
    this.size--;

    console.log(`pop(): ${last.val}`);
    return last.val;
  }

  peek() {
    const res = this.head.left.val;
    console.log(`peek(): ${res}`);
    return res;
  }

  isEmpty() {
    return this.size === 0;
  }

  size() {
    return size;
  }

  clear() {
    this.tail = new Node();
    this.head = new Node();
    [this.tail.right, this.head.left] = [this.head, this.tail];
    this.size = 0;
    console.log("clear()");
  }

  toArray() {
    let curr = this.tail.right;
    const res = [];
    while (curr.val) {
      res.push(curr.val);
      curr = curr.right;
    }

    console.log(`toArray(): ${res}`);
  }
}

const test = new Queue();
console.log(`size: ${test.size}`);
test.push(1);
test.push(2);
test.push(3);
test.push("4");
test.push("5");
test.push("6");
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
