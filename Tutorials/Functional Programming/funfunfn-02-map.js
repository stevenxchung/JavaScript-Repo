// Example 1
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

let names = [];
for (var i = 0; i < animals.length; i++) {
  names.push(animals[i].name);
}
// Check result
console.log(names);

// Example 2
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

let names = animals.map(function(animal) {
  return animal.name;
});
// Check result
console.log(names);

// Example 3
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

let names = animals.map(function(animal) {
  return animal.name + ' is a ' + animal.species;
});
// Check result
console.log(names);
