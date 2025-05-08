class HashTable {
  /**
   * @param {number} capacity
   */
  constructor({ capacity }) {
    this.capacity = capacity > 1 ? capacity : 2;
    // Store as {key: number, value: number}[][]
    this.table = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  _getIndex(key) {
    return key % this.capacity;
  }

  _getKeyValue(key) {
    const idx = this._getIndex(key);
    for (const [i, obj] of this.table[idx].entries()) {
      if (obj?.key === key) {
        // subArrayIndex, {key: number, value: number}
        return [i, obj];
      }
    }
    return [null, null];
  }

  _clear() {
    this.table = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  insert(key, value) {
    const [_, obj] = this._getKeyValue(key);
    if (obj) {
      console.log(`insert(${key}, ${value}): Updated`);
      obj.value = value;
      return;
    }

    // Automatically handles when to resize
    this.resize();

    const idx = this._getIndex(key);
    this.table[idx].push({ key, value });
    this.size++;
    console.log(`insert(${key}, ${value}): Added`);
  }

  /**
   * @param {number} key
   * @returns {number}
   */
  get(key) {
    let res = -1;
    const [_, obj] = this._getKeyValue(key);
    if (!obj) {
      console.log(`get(${key}): ${res}`);
      return res;
    }

    res = obj.value;
    console.log(`get(${key}): ${res}`);
    return res;
  }

  /**
   * @param {number} key
   * @returns {boolean}
   */
  remove(key) {
    let res = false;
    const [i, obj] = this._getKeyValue(key);
    if (!obj) {
      console.log(`remove(${key}): ${res}`);
      return res;
    }

    const idx = this._getIndex(key);
    this.table[idx].splice(i, 1);
    this.size--;

    res = true;
    console.log(`remove(${key}): ${res}`);
    return res;
  }

  /**
   * @returns {number}
   */
  getSize() {
    console.log(`getSize(): ${this.size}`);
    return this.size;
  }

  /**
   * @returns {number}
   */
  getCapacity() {
    console.log(`getCapacity(): ${this.capacity}`);
    return this.capacity;
  }

  /**
   * @return {void}
   */
  resize() {
    // Double capacity when size >= capacity / 2
    if (!(this.size >= Math.ceil(this.capacity / 2))) return;

    console.log("resize(): >= half of capacity, resizing...");

    this.capacity *= 2;
    this.size = 0;

    const temp = Array.from({ length: this.capacity }, () => []);

    for (const arr of this.table) {
      for (const obj of arr) {
        const idx = this._getIndex(obj.key);
        temp[idx].push(obj);
        this.size++;
      }
    }

    this.table = temp;
  }

  toString() {
    console.log(`toString(): ${JSON.stringify(this.table)}`);
  }
}

console.log("##### Test 1 #####");
test = new HashTable({ capacity: 4 });
test.insert(1, 2);
test.get(1);
test.toString();
test.insert(1, 3);
test.get(1);
test.toString();
test.remove(1);
test.get(1);
test.toString();

console.log("\n##### Test 2 #####");
test = new HashTable({ capacity: 2 });
test.getCapacity();
test.insert(6, 7);
test.getCapacity();
test.insert(1, 2);
test.getCapacity();
test.insert(3, 4);
test.getCapacity();
test.getSize();
test.toString();

console.log("\nAdditional testing...");
test = new HashTable({ capacity: 2 });
test.insert(7, 7);
test.insert(8, 8);
test.insert(9, 9);
test.getCapacity();
test.getSize();
test.toString();
