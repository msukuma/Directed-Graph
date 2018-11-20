const Edge = require('./edge');

module.exports = class Graph {
  constructor(data) {
    this.adjList = new Map();
  }


  /**
   * addEdge - adds an edge to the graph
   *
   * @param  {string} from      - String of length 1 e.g 'A'.
   * @param  {string} to        - String of length 1 e.g 'A'.
   * @param  {number} distance  - distance from 'from' to 'to'.
   */
  addEdge(from, to, distance) {
    const edge = new Edge(from, to, distance);
    let map = this.adjList.get(from);

    if (map) {
      map.set(to, edge);
    } else {
      map = new Map();
      map.set(to, edge);
      this.adjList.set(from, map);
    }
  }

  /**
   * hasNodes - checks that every node in 'nodes' is part of the graph
   *
   * @param  {Array<string>} nodes - An array or strings e.g ['A', 'F', ...].
   * @returns {boolean}            - True if they all exist, false otherwise.
   */
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

  /**
   * getEdge - returns and edge from 'from' to 'to'.
   *
   * @param  {string} from      - String of length 1 e.g 'A'.
   * @param  {string} to        - String of length 1 e.g 'A'.
   * @returns {Edge}            - An Edge instance or null;
   */
  getEdge(from, to) {
    const map = this.adjList.get(from);

    if (map) {
      return map.get(to) || null;
    }

    return null;
  }


  /**
   * getEdges - retrieves all out edges from 'from'.
   *
   * @param  {string} from      - String of length 1 e.g 'A'.
   * @returns {iterator}        - Returns an iterator
   */
  getEdges(from) {
    const map = this.adjList.get(from);
    if (map) return map.values();
    return [];
  }
};
