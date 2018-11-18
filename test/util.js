const { assert, expect } = require('chai');
const { loadGraph } = require('../util');
const Graph = require('../graph');
const { DATA } = require('./test-constants');

describe('util', () => {
  describe('loadGraph', () => {

    it('represents the data as an adjancency', () => {
      let list, actual;
      let graph = new Graph();

      loadGraph(DATA, graph);

      const expected = {
        A: ['B', 'D', 'E'],
        B: ['C'],
        C: ['D', 'E'],
        D: ['C', 'E'],
        E: ['B'],
      };

      Object.entries(expected).forEach(([node, neighbors]) => {
        list = graph.adjList.get(node);

        neighbors.forEach((n, i) => {
          let actual = list[i].to;
          expect(actual).to.equal(n);
        });
      });
    });
  });
});
