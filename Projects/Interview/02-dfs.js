// Given a graph and source, returns an array of node numbers in DFS order
let executeDFS = (graph, source) => {
  let nodesTraversed = [];
  let stack = [];
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
console.log(executeDFS(graph, 0)); // [0, 1, 4, 2, 3, 6, 5]
