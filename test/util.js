const { assert, expect } = require('chai');
const { loadGraph } = require('../util');
const { DATA } = require('./test-constants');

describe('util', () => {
  describe('loadGraph', () => {
    let adjList, edges;

    before(() => {
      let obj = loadGraph(DATA);
      adjList = obj.adjList;
      edges = obj.edges;
    });

    it('returns an object that has a Map instance', () => {
      expect(adjList).to.be.a('map');
    });

    it('returns a map that represents the data as an adjancency', () => {
      const expected = {
        A: ['B', 'D', 'E'],
        B: ['C'],
        C: ['D', 'E'],
        D: ['C', 'E'],
        E: ['B'],
      };

      Object.entries(expected).forEach(([node, expected]) => {
        const edgeObjs = adjList.get(node);
        const actual = edgeObjs.map(e => e.to);
        expect(actual).to.deep.equal(expected);
      });
    });

    it('returns an object that has a Set instance', () => {
      expect(edges).to.be.a('set');
    });

    it('returns a set of size 9', () => {
      expect(edges.size).to.equal(9);
    });
  });
});
