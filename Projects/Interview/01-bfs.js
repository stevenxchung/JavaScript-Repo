// Given a graph and source, returns an array of node numbers in BFS order
let executeBFS = (graph, source) => {
  let nodesTraversed = [];
  let queue = [];
  // Enqueue source to beginning of array
  queue.unshift(source);
  // Continue until queue is empty
  while (queue.length > 0) {
    console.log('queue', queue);
    // Dequeue node from queue each time
    let currentNode = queue.pop();
    for (let i = 0; i < graph[currentNode].length; i++) {
      let neighbor = graph[currentNode][i];
      if (!nodesTraversed.includes(neighbor)) {
        console.log('current node', currentNode);
        console.log('neighbor', neighbor);
        queue.unshift(neighbor);
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
console.log(executeBFS(graph, 0)); // [0, 1, 4, 5, 2, 6]

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
