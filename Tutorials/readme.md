# Variable Scope in JavaScript

Here we will discuss some examples of variable scope in JavaScript.

## Example 1 - A Globally-Scoped Variable

```javascript
// Global scope
var a = 1;

function one() {
  alert(a); // Alerts 'a'
}
```

In this example, the variable *a* is declared outside of the function and in the main body of the script. Therefore, *a* is a global variable that can be referenced in any function in the script.

## Example 2 - Local Scope

```javascript
// Global scope
var a = 1;

function two(a) {
  // Local scope
  alert(a); // Alerts the given argument, not the global value of '1'
}

function three() {
  // Local scope again
  var a = 3;
  alert(a); // Alerts '3'
}
```
The variable *a* is first declared as a global variable. However, the function two() alerts the given argument which is not necessarily the same as the global variable *a*.

In function three(), the variable *a* is redeclared inside of the function which makes *a* a local variable.

## Example 3 - Intermediate



