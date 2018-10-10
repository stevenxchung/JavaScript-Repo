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
