const Edge = require('./edge');

module.exports = class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addEdge(from, to, distance) {
    const edge = new Edge(from, to, distance);
    const list = this.adjList.get(from);

    if (list) {
      list.push(edge);
    }
    else {
      this.adjList.set(from, [edge]);
    }
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

  getEdge(from, to) { // can be improved with binary search and sortedlist
    const list = this.adjList.get(from);
    let edge;

    for (var i = 0; i < list.length; i++) {
      edge = list[i];
      if (edge.to === to)
        return edge;
    }

    return null;
  }

  getNeighbors(of) {
    return this.adjList.get(of);
  }
};
