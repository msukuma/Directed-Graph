const { loadGraph } = require('./util');

module.exports = class Graph {
  constructor(data) {
    const { adjList, edges } = loadGraph(data);
    this.adjList = adjList;
    this.edges = edges;
  }
};
