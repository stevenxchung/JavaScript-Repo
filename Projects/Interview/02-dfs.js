// Given a graph and source, returns an array of node numbers in DFS order
let executeDFS = (graph, source) => {
  let nodesTraversed = [];
  let stack = [];
  // Push source to the array
  stack.push(source);
  // Continue until stack is empty
  while (stack.length > 0) {
    // Remove first node in stack each time
    let currentNode = stack.pop();
    for (let i = 0; i < graph[currentNode].length; i++) {
      let neighbor = graph[currentNode][i];
      if (!nodesTraversed.includes(neighbor)) {
        console.log('current node', currentNode);
        console.log('neighbor', neighbor);
        stack.push(neighbor);
        if (!nodesTraversed.includes(currentNode)) {
          // Only push current node to nodesTraversed array once
          nodesTraversed.push(currentNode);
        }
      }
    }
  }
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
console.log(executeDFS(graph, 0)); // [0, 1, 5, 6, 3, 2]
