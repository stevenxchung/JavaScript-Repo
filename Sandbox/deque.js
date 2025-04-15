class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor(arr = []) {
    this.front = null;
    this.rear = null;
    this.size = 0;

    for (const val of arr) {
      this.push(val);
    }
  }

  pushLeft(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.front = this.rear = newNode;
    } else {
      newNode.next = this.front;
      this.front.prev = newNode;
      this.front = newNode;
    }
    this.size++;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.front = this.rear = newNode;
    } else {
      newNode.prev = this.rear;
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  popLeft() {
    if (this.size === 0) return null;
    const value = this.front.value;
    if (this.size === 1) {
      this.front = this.rear = null;
    } else {
      this.front = this.front.next;
      this.front.prev = null;
    }
    this.size--;
    return value;
  }

  pop() {
    if (this.size === 0) return null;
    const value = this.rear.value;
    if (this.size === 1) {
      this.front = this.rear = null;
    } else {
      this.rear = this.rear.prev;
      this.rear.next = null;
    }
    this.size--;
    return value;
  }

  peekLeft() {
    return this.front ? this.front.value : null;
  }

  peek() {
    return this.rear ? this.rear.value : null;
  }

  isEmpty() {
    return this.size === 0;
  }

  size() {
    return this.size;
  }

  toArray() {
    let current = this.front;
    const result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

module.exports = Deque;
