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

// Example 3
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy Duck', species: 'duck' },
  { name: 'Courage', species: 'dog' },
  { name: 'Donald Duck', species: 'duck' }
];

// If true, psuh to array, otherwise do not
let ducks = animals.filter(function(animal) {
  return animal.species === 'duck';
});

// Example 4
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy Duck', species: 'duck' },
  { name: 'Courage', species: 'dog' },
  { name: 'Donald Duck', species: 'duck' }
];

// If true, psuh to array, otherwise do not
let ducks = animals.filter(function(animal) {
  return animal.species === 'duck';
});

// Example 5
let animals = [
  { name: 'Bugs Bunny', species: 'rabbit' },
  { name: 'Daffy Duck', species: 'duck' },
  { name: 'Courage', species: 'dog' },
  { name: 'Donald Duck', species: 'duck' }
];

isDuck = function(animal) {
  return animal.species === 'duck';
};

// If true, push to array, otherwise do not
let ducks = animals.filter(isDuck);
// Opposite of filter()
let others = animals.reject(isDuck);
