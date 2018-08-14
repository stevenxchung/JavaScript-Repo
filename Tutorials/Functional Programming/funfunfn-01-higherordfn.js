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
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

let ducks = [];
for (var i = 0; i < animals.length; i++) {
  if (animals[i].species === 'duck') {
    ducks.push(animals[i]);
  }
}

// Example 3
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

// If true, psuh to array, otherwise do not
let ducks = animals.filter(function(animal) {
  return animal.species === 'duck';
});

// Example 4
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

// If true, psuh to array, otherwise do not
let ducks = animals.filter(function(animal) {
  return animal.species === 'duck';
});

// Example 5
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy', species: 'duck' },
  { name: 'Donald', species: 'duck' },
  { name: 'Goofy', species: 'dog' },
  { name: 'Mickey', species: 'mouse' }
];

let isDuck = function(animal) {
  return animal.species === 'duck';
};

// If true, push to array, otherwise do not
let ducks = animals.filter(isDuck);
console.log(ducks);
// Opposite of filter()
// let others = animals.reject(isDuck);
let others = animals.filter(e => !isDuck(e));
console.log(others);
