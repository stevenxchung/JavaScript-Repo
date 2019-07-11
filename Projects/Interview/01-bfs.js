// Given a graph and source, returns an array of node numbers in BFS order
let executeBFS = (graph, source) => {
  let nodesTraversed = [];
  return nodesTraversed;
};

// Test
const graph = [
  [1], // 0
  [0, 4, 5], // 1
  [3, 4, 5], // 2
  [2, 6], // 3
  [1, 2], // 4
  [1, 2, 6], // 5
  [3, 5], // 6
  [] // 7
];
console.log(executeBFS(graph, 0)); // [0, 1, 4, 5, 2, 6, 3, 7]

// [
//   { distance: 0, predecessor: null },
//   { distance: 1, predecessor: 0 },
//   { distance: 3, predecessor: 4 },
//   { distance: 4, predecessor: 2 },
//   { distance: 2, predecessor: 1 },
//   { distance: 2, predecessor: 1 },
//   { distance: 3, predecessor: 5 },
//   { distance: null, predecessor: null }
// ];
