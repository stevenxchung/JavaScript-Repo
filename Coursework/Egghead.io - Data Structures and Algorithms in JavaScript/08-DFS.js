// Depth First Search Algorithm for Graphs in JavaScript

const { createQueue } = require('../queues/index.js');

let createNode = key => {
  const children = [];

  return {
    key,
    children,
    addChild(node) {
      children.push(node);
    }
  };
};

let createGraph = (directed = false) => {
  const nodes = [];
  const edges = [];

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key));
    },

    getNode(key) {
      return nodes.find(n => n.key === key);
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key);
      const node2 = this.getNode(node2Key);

      node1.addChild(node2);

      if (!directed) {
        node2.addChild(node1);
      }

      edges.push(`${node1Key}${node2Key}`);
    },

    print() {
      return nodes
        .map(({ children, key }) => {
          let result = `${key}`;

          if (children.length) {
            result += ` => ${children.map(node => node.key).join(' ')}`;
          }

          return result;
        })
        .join('\n');
    },

    // Breadth First Search
    breadthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);
      const visited = nodes.reduce((acc, node) => {
        acc[node.key] = false;
        return acc;
      }, {});
      const queue = createQueue();
      queue.enqueue(startingNode);

      while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();

        if (!visited[currentNode.key]) {
          visitFn(currentNode);
          visited[currentNode.key] = true;
        }

        currentNode.neighbors.forEach(node => {
          if (!visited[node.key]) {
            queue.enqueue(node);
          }
        });
      }
    },

    // Depth First Search
    depthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNode);
      const visited = nodes.reduce((acc, node) => {
        acc[node.key] = false;
        return acc;
      }, {});

      let explore = node => {
        if (visited[node.key]) {
          return;
        }

        visitFn(node);
        visited[node.key] = true;

        node.neighbors.forEach(node => {
          explore(node);
        });

        explore(startingNode);
      };
    }
  };
};
