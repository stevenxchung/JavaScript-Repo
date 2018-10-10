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
