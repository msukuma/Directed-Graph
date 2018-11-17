const Graph = require('../graph');
const { assert, expect } = require('chai');
const { DATA } = require('./test-constants');

describe('Graph', () => {
  let graph;
  before(() => graph = new Graph(DATA));

  describe('constructor', () => {

    it('should create a graph instance', () => {
      expect(graph).to.be.an.instanceof(Graph);
    });

    it('should create a graph with an adjList property', () => {
      expect(graph).to.have.own.property('adjList');
    });

    it('should create a graph with an edges property', () => {
      expect(graph).to.have.own.property('edges');
    });
  });

  describe('hasNodes', () => {
    it('method exists', () => {
      expect(graph.hasNodes).to.be.a('function');
    });

    it('validates input is an Array', () => {
      const badCall = () => graph.hasNodes('A-B-C');
      expect(badCall).to.throw('Array');
    });

    it('validates input is an Array of 1 char strings', () => {
      const badCall = () => graph.hasNodes(['A', 'B', {}]);
      expect(badCall).to.throw('string');
    });

    it('return true if graph has all input nodes', () => {
      expect(graph.hasNodes(['A', 'B', 'C'])).to.equal(true);
    });

    it('return true if graph does not have all input nodes', () => {
      expect(graph.hasNodes(['A', 'B', 'F'])).to.equal(false);
    });
  });

});
