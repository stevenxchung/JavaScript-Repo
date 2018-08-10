// Key Idea: Functions are values

// Example 1
let triple = function(x) {
  return x * 3;
};

let waffle = triple;

waffle(30);

// Example 2
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy Duck', species: 'duck' },
  { name: 'Courage', species: 'dog' },
  { name: 'Donald Duck', species: 'duck' }
];

let ducks = [];
for (var i = 0; i < animals.length; i++) {
  if (animals[i].species === 'duck') {
    ducks.push(animals[i]);
  }
}

console.log(ducks);
