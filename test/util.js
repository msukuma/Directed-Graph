const { assert, expect } = require('chai');
const {
  loadGraph,
  loadGraphSync,
} = require('../lib/util');
const { DATA } = require('./test-constants');
const path = require('path');
const Graph = require('../lib/graph');
const dataPath = path.join(__dirname, '..', 'data', 'sample-data.txt');

const testLoading = graph => {
  let map, actual;
  const expected = {
    A: ['B', 'D', 'E'],
    B: ['C'],
    C: ['D', 'E'],
    D: ['C', 'E'],
    E: ['B'],
  };

  Object.entries(expected).forEach(([node, edges]) => {
    map = graph.adjList.get(node);

    edges.forEach(edge => {
      actual = map.get(edge).to;
      expect(actual).to.equal(edge);
    });
  });
};

describe('util', () => {
  let graph;

  describe('loadGraphSync', () => {
    before(() => {
      graph = new Graph();
      loadGraphSync(DATA, graph);
    });

    it('should represent the data as an adjancency', () => {
      testLoading(graph);
    });
  });

  describe('loadGraph', () => {
    let resolveGraph;

    before(() => {
      graph = new Graph();
      return loadGraph(dataPath, graph).then(g => {
        resolveGraph = g;
        return g;
      });
    });

    it('should resolve the graph that is passed to it', () => {
      expect(resolveGraph).to.equal(graph);
    });

    it('should represent the data as an adjancency', () => {
      testLoading(graph);
    });
  });
});
