class Heap {
  constructor(comparator = (a, b) => a - b) {
    // The comparator dictates whether the heap is min or max heap
    this.compare = comparator;
    this.heap = [];
  }

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return 2 * i + 1;
  }

  _right(i) {
    return 2 * i + 2;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _heapifyUp() {
    let i = this.size - 1;
    while (
      i > 0 &&
      this.compare(this.heap[i], this.heap[this._parent(i)]) < 0
    ) {
      this._swap(i, this._parent(i));
      i = this._parent(i);
    }
  }

  _heapifyDown(i) {
    const n = this.size;
    while (this._left(i) < n) {
      let smallest = i;
      const left = this._left(i);
      const right = this._right(i);

      if (left < n && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (
        right < n &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
  }

  peek() {
    return this.heap[0] ?? null;
  }

  get size() {
    return this.heap.length;
  }

  setHeap(arr) {
    this.heap = arr;
  }

  toArray() {
    return [...this.heap];
  }

  // ---- heapq-style methods ----

  push(val) {
    this.heap.push(val);
    this._heapifyUp();
  }

  pop() {
    if (this.size === 0) return null;
    if (this.size === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return root;
  }

  heapify(arr) {
    this.heap = [...arr];
    const lastParent = Math.floor(this.size / 2) - 1;
    for (let i = lastParent; i >= 0; i--) this._heapifyDown(i);
  }

  getTopK(k) {
    if (k <= 0) return [];

    // Flip the comparator to build a heap that keeps the top K elements
    const invert = (a, b) => this.compare(b, a);
    const topKHeap = new Heap(invert);

    for (const val of this.heap) {
      if (topKHeap.size < k) {
        topKHeap.push(val);
      } else if (this.compare(val, topKHeap.peek()) < 0) {
        topKHeap.pop();
        topKHeap.push(val);
      }
    }

    return topKHeap.toArray().sort(this.compare);
  }
}

module.exports = Heap;
