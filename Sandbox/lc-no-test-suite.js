const { performance } = require("perf_hooks");

/*
  - Use hashmap where key is a string and value is an array of [value, timestamp]
  - On fetch, use binary search to return the latest timestamp <= given timestamp
*/
class Solution {
  constructor(debug = false) {
    this.debug = debug;
    this.table = {};
  }

  set(key, value, timestamp) {
    if (key in this.table) this.table[key].push([value, timestamp]);
    else this.table[key] = [[value, timestamp]];
  }

  get(key, timestamp) {
    let [v, t] = [this.table[key][this.table[key].length - 1]];
    if (key in this.table && this.table[key].length === 1) {
      v = this.table[key][0][0];
      if (this.debug) console.log(v);
      return v;
    }

    let [l, r] = [0, this.table[key].length - 1];
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      [v, t] = this.table[key][m];
      // Binary search on timestamp
      if (t === timestamp) {
        if (this.debug) console.log(v);
        return v;
      } else if (t < timestamp) l = m + 1;
      else r = m - 1;
    }

    if (this.debug) console.log(v);
    return v;
  }
}

const test = new Solution((debug = true));
const solStart = performance.now();
test.set("foo", "bar", 1);
test.get("foo", 1); // return "bar"
test.get("foo", 3); // return "bar"
test.set("foo", "bar2", 4);
test.get("foo", 4); // return "bar2"
test.get("foo", 5); // return "bar2"
console.log(`Runtime for solution: ${(performance.now() - solStart) / 1000}`);
