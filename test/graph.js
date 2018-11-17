const Graph = require('../graph');
const { assert, expect } = require('chai');
const { DATA } = require('./test-constants');

describe('Graph', () => {
  describe('constructor', () => {
    let graph;

    before(() => graph = new Graph(DATA));

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

});
