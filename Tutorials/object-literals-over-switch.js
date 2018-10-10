// From Todd Motto: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

// Classic switch
var type = 'coke';
var drink;
switch (type) {
  case 'coke':
    drink = 'Coke';
    break;
  case 'pepsi':
    drink = 'Pepsi';
    break;
  default:
    drink = 'Unknown drink!';
}
console.log(drink); // 'Coke'

// Classic else if
function getDrink(type) {
  if (type === 'coke') {
    type = 'Coke';
  } else if (type === 'pepsi') {
    type = 'Pepsi';
  } else if (type === 'mountain dew') {
    type = 'Mountain Dew';
  } else if (type === 'lemonade') {
    type = 'Lemonade';
  } else if (type === 'fanta') {
    type = 'Fanta';
  } else {
    // acts as our "default"
    type = 'Unknown drink!';
  }
  return "You've picked a " + type;
}

// Example 1 - Object literal
function getDrink(type) {
  var drinks = {
    coke: 'Coke',
    pepsi: 'Pepsi',
    lemonade: 'Lemonade',
    default: 'Default item'
  };
  return 'The drink I chose was ' + (drinks[type] || drinks['default']);
}
var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);

// Example 1 - Refactored
function getDrink(type) {
  var drinks = {
    coke: function() {
      return 'Coke';
    },
    pepsi: function() {
      return 'Pepsi';
    },
    lemonade: function() {
      return 'Lemonade';
    }
  };
  return drinks[type]();
}
// let's call it
var drink = getDrink('coke');
console.log(drink); // 'Coke'

// Example 1 - Add default drink
function getDrink (type) {
  var drink;
  var drinks = {
    'coke': function () {
      drink = 'Coke';
    },
    'pepsi': function () {
      drink = 'Pepsi';
    },
    'lemonade': function () {
      drink = 'Lemonade';
    },
    'default': function () {
      drink = 'Default item';
    }
  };

  // invoke it
  (drinks[type] || drinks['default'])();

  // return a String with chosen drink
  return 'The drink I chose was ' + drink;
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);

// Example 2 - "Fall through" using switch
var type = 'coke';
var snack;
switch(type) {
case 'coke':
case 'pepsi':
  snack = 'Drink';
  break;
case 'cookies':
case 'crisps':
  snack = 'Food';
  break;
default:
  drink = 'Unknown type!';
}
console.log(snack); // 'Drink'

// Example 2 - Using object literals
function getSnack (type) {
  var snack;
  function isDrink () {
    return snack = 'Drink';
  }
  function isFood () {
    return snack = 'Food';
  }
  var snacks = {
    'coke': isDrink,
    'pepsi': isDrink,
    'cookies': isFood,
    'crisps': isFood,
  };
  return snacks[type]();
}

var snack = getSnack('coke');
console.log(snack); // 'Drink'
