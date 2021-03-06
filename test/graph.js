const Graph = require('../lib/graph');
const { loadGraphSync } = require('../lib/util');
const { assert, expect } = require('chai');
const {
  DATA,
  A, B, C, D, E, F,
} = require('./test-constants');

describe('Graph', () => {
  let graph;
  before(() => {
    graph = new Graph();
    loadGraphSync(DATA, graph);
  });

  describe('constructor', () => {
    it('should create a graph instance', () => {
      expect(graph).to.be.an.instanceof(Graph);
    });
  });

  describe('hasNodes', () => {
    it('exists', () => {
      expect(graph.hasNodes).to.be.a('function');
    });

    it('validates inputs are 1 char strings', () => {
      const badCall = () => graph.hasNodes(A, B, {});
      expect(badCall).to.throw('string');
    });

    it('return true if graph has all input nodes', () => {
      expect(graph.hasNodes(A, B, C)).to.equal(true);
    });

    it('return false if graph does not have all input nodes', () => {
      expect(graph.hasNodes(A, B, F)).to.equal(false);
    });
  });

  describe('getEdge', () => {
    it('exists', () => {
      expect(graph.getEdge).to.be.a('function');
    });

    it('should return an edge between the frist input and the second input if one exists', () => {
      expect(graph.getEdge(A, B)).to.equal(graph.adjList.get(A).get(B));
    });

    it(`should return null if there's no edge between the frist input and the second input`, () => {
      expect(graph.getEdge(A, C)).to.equal(null);
    });
  });

  describe('_validateNodes', () => {
    it('throws an error if one of the input nodes does not exist', () => {
      expect(() => { graph._validateNodes(F); }).to.throw('graph');
    });

    it('throws an error if one of the inputs is not a 1 char string', () => {
      expect(() => { graph._validateNodes('NO'); }).to.throw('length');
    });
  });

});
