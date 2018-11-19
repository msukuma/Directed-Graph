const RoutesGraph = require('../routes-graph');
const Graph = require('../graph');
const {
  loadGraph,
  loadGraphAsync,
} = require('../util');
const { assert, expect } = require('chai');
const {
  DATA,
  NO_ROUTE,
  A, B, C, D, E, F
} = require('./test-constants');

describe('RoutesGraph', () => {
  let graph;
  before(() => {
    graph = new RoutesGraph();
    loadGraph(DATA, graph);
  });

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

  describe('numRoutes', () => {
    let args;

    it('should exists', () => {
      expect(graph.numRoutes).to.be.a('function');
    });

    describe('_maxStops', () => {
      it('should exists', () => {
        expect(graph._maxStops).to.be.a('function');
      });

      it(`should return 2 when numRoutes is called with { from: '${C}', to: '${C}', maxStops: 3}`, () => {
        args = { from: C, to: C, maxStops: 3 };
        expect(graph.numRoutes(args)).to.equal(2);
      });

    });

    describe('_exactStops', () => {
      it('should exists', () => {
        expect(graph._exactStops).to.be.a('function');
      });

      it(`should return 3 when numRoutes is called with { from: '${A}', to: '${C}', exactStops: 4}`, () => {
        args = { from: A, to: C, exactStops: 4 };
        expect(graph.numRoutes(args)).to.equal(3);
      });
    });

    describe('_maxDistance', () => {
      it('should exists', () => {
        expect(graph._maxDistance).to.be.a('function');
      });

      it(`should return 7 when numRoutes is called with { from: '${C}', to: '${C}', maxDistance: 30}`, () => {
        args = { from: C, to: C, maxDistance: 30 };
        expect(graph.numRoutes(args)).to.equal(7);
      });
    });
  });

  describe('shortestRoute', () => {
    it('should exists', () => {
      expect(graph.shortestRoute).to.be.a('function');
    });

    it('should return -1 if there is no route');

    it('should return 9 as the distance of the shortest route from A to C', () => {
      expect(graph.shortestRoute(A, C)).to.equal(9);
    });

    it('should return 9 as the distance of the shortest route from B to B', () => {
      expect(graph.shortestRoute(B, B)).to.equal(9);
    });
  });
});
