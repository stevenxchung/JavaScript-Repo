// Example 1
let promiseToCleanTheRoom = new Promise(function(resolve, reject) {

  // cleanTheRoom()

  // Result of cleanTheRoom() (mock result)
  let isClean = false;

  if (isClean) {
    resolve('Clean');
  } else {
    reject('Not Clean');
  }
});

promiseToCleanTheRoom.then(function(fromResolve) {
  console.log('the room is ' + fromResolve);
}).catch(function(fromReject) {
  console.log('the room is ' + fromReject);
});

// Example 2
let cleanRoom = function() {
  return new Promise(function(resolve, reject) {
    resolve('Cleaned the room');
  });
};

let removeGarbage = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + 'Removed garbage');
  });
};

let winIcecream = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + 'Won ice cream!')
  });
};

cleanRoom().then(function(result) {
  return removeGarbage(result + ' then ');
}).then(function(result) {
  return winIcecream(result + ' then ');
}).then(function(result) {
  console.log('Finished! ' + result);
});
