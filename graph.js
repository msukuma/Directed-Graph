const { loadGraph } = require('./util');

module.exports = class Graph {
  constructor(data) {
    const { adjList, edges } = loadGraph(data);
    this.adjList = adjList;
    this.edges = edges;
  }

  hasNodes(nodes) {
    let node;

    if (!(nodes instanceof Array)) {
      throw new Error('nodes must be an Array of Strings of length 1 (i.e. char)');
    }

    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];

      if (typeof node !== 'string' || node.length !== 1) {
        throw new Error('a node must be a string of length 1 (i.e. char)');
      }

      if (!this.adjList.has(node)) { return false; }
    }

    return true;
  }

  getEdge(from, to) {
    const map = this.adjList.get(from);

    if (map) {
      return map.get(to) || null;
    }

    return null;
  }
};
