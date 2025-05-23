# Variable Scope in JavaScript

Here we will discuss some examples of variable scope in JavaScript.

## Example 1 - A Globally-Scoped Variable

```javascript
// Global scope
var a = 1;

function funcOne() {
  alert(a); // Alerts 'a'
}
```

In this example, the variable _a_ is declared outside of the function and in the main body of the script. Therefore, _a_ is a global variable that can be referenced in any function in the script.

## Example 2 - Local Scope

```javascript
// Global scope
var a = 1;

function funcTwo(a) {
  // Local scope
  alert(a); // Alerts the given argument, not the global value of '1'
}

function funcThree() {
  // Local scope again
  var a = 3;
  alert(a); // Alerts '3'
}
```

The variable _a_ is first declared as a global variable. However, the function funcTwo() alerts the given argument which is not necessarily the same as the global variable _a_.

In function funcThree(), the variable _a_ is redeclared inside of the function which makes _a_ a local variable.

## Example 3 - Intermediate (ES5-ES6: let)

```javascript
var a = 1;

function funcFour() {
  if (true) {
    var a = 4;
  }
  alert(a); // Alerts '4' not the global value of '1'
}
```

Function funcFour() reinitiates _a_ to be '4' instead of '1' so when the alert() function is called within the function, the result is '4'.

```javascript
var a = 1;

function funcFive() {
  if (true) {
    let a = 4;
  }
  alert(a); // Alerts '1' since the "let" keyword uses block scoping
}
```

Function funcFive() uses the keyword "let" which uses block scoping. Since there is no block scoping in JavaScript, when alert(a) is called, the value of '1' is broadcast.

## Example 4 - Intermediate (Object Properties)

```javascript
var a = 1;

function funcSix() {
  this.a = 5;
}

alert(new funcSix().a); // Alerts '5'
```

In funcSix(), because _this_ is not inside of a declared object, when the keyword _this_ is called, it assigns the global object to be '5' such that when alert() is called on funcSix().a, the value broadcasted is '5'.

## Example 5 - Advanced (Closure)

```javascript
var a = 1;

var seven = (function () {
  var a = 6;

  return function () {
    alert(a); // Alerts '6'
  };
})();
```

In the example above, _a_ is accessible in the return function where alert() is called because it is defined in the same function where the return function is defined. This is called closure. The result of this is, when alert() is called in the return function, the value '6' is broadcasted.

## Example 6 - Advanced (Prototype-based Scope Resolution)

```javascript
var a = 1;

function funcEight() {
  this.a = 7;
}

funcEight.prototype.a = -1; // Won't be reached

funcEight.prototype.b = 8; // Will be reached

alert(new funcEight().a); // Alerts '7'
alert(new funcEight().b); // Alerts '8'
```

The function funcEight() sets the global object to be '7'. Because _a_ is set in the constructor by using _this_ in funcEight(), when funcEight.prototype.a is assigned a new value, it will not be reached. Conversely, since _b_ was not set by any constructor, it can be reached when a new prototype is created.

## Example 7 - Global + Local (Extra Complex Case)

```javascript
var x = 5;
(function () {
  console.log(x); // Undefined
  var x = 10;
  console.log(x); // Prints out '10'
})();
```

Because JavaScript always moves variable declarations (not initializations) to the top of the scope, the code above is equivalent to:

```javascript
var x = 5;
(function () {
  var x; // Not defined
  console.log(x); // Undefined
  var x = 10;
  console.log(x); // Prints '10'
})();
```

## Example 8 - Catch Clause-scoped Variable

```javascript
var e = 5;
console.log(e); // Prints '5'
try {
  throw 6;
} catch (e) {
  console.log(e); // Prints '6'
}
console.log(e); // Prints '5'
```

Inside the catch clause, _e_ shadows global and local variables. But the special scope is only for the caught variable. If you write "var e;" inside of the catch clause, it is exactly the same as if you had defined it before or after the try-catch block.
