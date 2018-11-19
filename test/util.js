const { assert, expect } = require('chai');
const { loadGraph } = require('../util');
const Graph = require('../graph');
const { DATA } = require('./test-constants');

describe('util', () => {
  describe('loadGraph', () => {
    let graph;

    before(() => {
      graph = new Graph();
      loadGraph(DATA, graph);
    });

    it('returns a map that represents the data as an adjancency', () => {
      let map, actual;
      const expected = {
        A: ['B', 'D', 'E'],
        B: ['C'],
        C: ['D', 'E'],
        D: ['C', 'E'],
        E: ['B'],
      };

      Object.entries(expected).forEach(([node, neighbors]) => {
        map = graph.adjList.get(node);

        neighbors.forEach(expected => {
          let actual = map.get(expected).to;
          expect(actual).to.equal(expected);
        });
      });
    });
  });
});
