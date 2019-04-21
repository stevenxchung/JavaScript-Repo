const { createQueue } = require('../queues/index.js');

function createNode(key) {
  const children = [];

  return {
    key,
    children,
    addChild(node) {
      children.push(node);
    }
  };
}

function createGraph(directed = false) {
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
    }
    // Breadth First Search
  };
}

// Tests
const graph = createGraph(true);
const nodes = ['a', 'b', 'c', 'd', 'e', 'f'];
const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e']
];

nodes.forEach(node => {
  graph.addNode(node);
});

edges.forEach(nodes => {
  graph.addEdge(...nodes);
});

exports.createNode = createNode;
exports.createGraph = createGraph;