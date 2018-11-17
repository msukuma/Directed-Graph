const RoutesGraph = require('../routes-graph');
const Graph = require('../graph');
const { assert, expect } = require('chai');
const {
  DATA,
  NO_ROUTE,
} = require('./test-constants');

describe('RoutesGraph', () => {
  let graph;
  before(() => graph = new RoutesGraph(DATA));

  describe('constructor', () => {

    it('should create a graph instance', () => {
      expect(graph).to.be.an.instanceof(Graph);
    });
  });

  describe('distance', () => {
    it('should exists', () => {
      expect(graph.distance).to.be.a('function');
    });

    it('should return the distance of a route if route exists', () => {
      expect(graph.distance('A-B-C-D')).to.equal(17);
    });

    it(`should return ${NO_ROUTE} if routes does not exist`, () => {
      expect(graph.distance('A-B-F-D')).to.equal(NO_ROUTE);
    });

    it('should return 9 for route A-B-C.', () => {
      expect(graph.distance('A-B-C')).to.equal(9);
    });

    it('should return 5 for route A-D.', () => {
      expect(graph.distance('A-D')).to.equal(5);
    });

    it('should return 13 for route A-D-C.', () => {
      expect(graph.distance('A-D-C')).to.equal(13);
    });

    it('should return 22 for route A-E-B-C-D.', () => {
      expect(graph.distance('A-E-B-C-D')).to.equal(22);
    });

    it(`should return ${NO_ROUTE} for route A-E-D.`, () => {
      expect(graph.distance('A-E-D')).to.equal(NO_ROUTE);
    });
  });

});
