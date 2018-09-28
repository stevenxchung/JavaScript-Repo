// Why do we use RxJS?
// RxJS is all about getting any kind of callback in JS and representing that as a collection, then you can operate on that collection.

// Example 1: Callbacks
const myElem = document.querySelector("#myElem");

function consoleLogClick(x) {
  console.log(`clicked! ${x}`);
}

myElem.addEventListener("click", consoleLogClick);

// Example 2: Arrays
const arr = [10, 20, 30, 40, 50, 60];

console.log("before");
arr.forEach(function cb(x) {
  console.log(x);
});
console.log("after");

// Example 3: Promises
const res = fetch("https://jsonplaceholder.typicode.com/users/1").then(r =>
  r.json()
);

function successCallback(value) {
  console.log(`We got back ${value}`);
}

function failureCallback(err) {
  console.error(`:( ${err}`);
}

res.then(successCallback, failureCallback);

// Example 4: Node.js Streams
const readable = getReadableStreamSomehow();

function nextDataCallback(chunk) {
  console.log(`Received ${chunk.length} bytes of data`);
}

function errorCallback(err) {
  console.error(`Bad stuff happened: ${err}.`);
}

function doneCallback() {
  console.log("There will be no more data.");
}

readable.on("data", nextDataCallback);
readable.on("error", errorCallback);
readable.on("end", doneCallback);

// Example 5: Generic API - Step 1
function nextCallback(data) {
  console.log(data);
}

function errorCallback(err) {
  console.log(err);
}

function completeCallback() {
  console.log("done");
}

function giveMeSomeData(nextCB, errorCB, completeCB) {
  // Click event example
  // document.addEventListener('click', nextCB);
  // Fetch url example
  // fetch(url).then(nextCB, errorCB);
  [10, 20, 30].forEach(nextCB);
}

// Invoking giveMeSomeData()
giveMeSomeData(nextCallback, errorCallback, completeCallback);

// Example 5: Generic API - Step 2
function createObservable(subscribe) {
  return {
    subscribe: subscribe
  };
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener("click", ob.next);
});

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

// Invoking subscribe()
arrayObservable.subscribe(observer);

// Example 5: Generic API - Step 3
function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map
  };
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener("click", ob.next);
});

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

// Invoking subscribe()
arrayObservable.map(x => x / 10).subscribe(observer);

// Example 5: Generic API - Step 4
function filter(conditionFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        if (conditionFn(x)) {
          outputObserver.next(x);
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map,
    filter: filter
  };
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener("click", ob.next);
});

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

// Invoking subscribe()
arrayObservable
  .map(x => x / 10)
  .filter(x => x !== 2)
  .subscribe(observer);

// Example 5: Generic API - Step 5
function filter(conditionFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        if (conditionFn(x)) {
          outputObserver.next(x);
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map,
    filter: filter
  };
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener("click", ob.next);
});

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

// Invoking subscribe()
clickObservable
  .map(ev => ev.clientX)
  .filter(x => x < 200)
  .subscribe(observer);

// Example 5: Generic API - Step 6
function delay(period) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        setTimeout(function() {
          outputObserver.next(x);
        }, period);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function filter(conditionFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        if (conditionFn(x)) {
          outputObserver.next(x);
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function(x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map,
    filter: filter,
    delay: delay
  };
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener("click", ob.next);
});

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

// Invoking subscribe()
clickObservable
  .map(ev => ev.clientX)
  .filter(x => x < 200)
  .delay(2000)
  .subscribe(observer);

// Example 6: RxJS Shipped
import { Observable } from "rxjs";

const numbersObservable = Observable.from([10, 20, 30, 40, 50, 60]);

numbersObservable
  .filter(x => x !== 20)
  .map(x => x / 10)
  .subscribe({
    next: function next(x) {
      console.log(x);
    },
    error: function error(err) {},
    complete: function complete() {
      console.log("done");
    }
  });
