const RoutesGraph = require('../lib/routes-graph');
const Graph = require('../lib/graph');
const {
  loadGraph,
  loadGraphSync,
} = require('../lib/util');
const { assert, expect } = require('chai');
const {
  dataPath,
  NO_ROUTE,
  A, B, C, D, E, F,
} = require('./test-constants');

describe('RoutesGraph', () => {
  let graph;
  before(() => {
    graph = new RoutesGraph();
    loadGraph(dataPath, graph).then(g => g);
  });

  describe('constructor', () => {
    it('should create a graph instance', () => {
      expect(graph).to.be.an.instanceof(Graph);
    });
  });

  describe('distance', () => {
    it('exists', () => {
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

    it('exists', () => {
      expect(graph.numRoutes).to.be.a('function');
    });

    describe('_maxStops', () => {
      it('exists', () => {
        expect(graph._maxStops).to.be.a('function');
      });

      it(`should return 2 when numRoutes is called with { from: '${C}', to: '${C}', maxStops: 3 }`, () => {
        args = {
          from: C,
          to: C,
          maxStops: 3,
          show: true
        };
        expect(graph.numRoutes(args)).to.equal(2);
      });

    });

    describe('_maxStopsRecursive', () => {
      it('exists', () => {
        expect(graph._maxStopsRecursive).to.be.a('function');
      });

      it(`should return 2 when numRoutes is called with { from: '${C}', to: '${C}', maxStops: 3, recursive: true }`, () => {
        args = {
          from: C,
          to: C,
          maxStops: 3,
          recursive: true,
          show: true,
        };
        expect(graph.numRoutes(args)).to.equal(2);
      });

    });

    describe('_exactStops', () => {
      it('exists', () => {
        expect(graph._exactStops).to.be.a('function');
      });

      it(`should return 3 when numRoutes is called with { from: '${A}', to: '${C}', exactStops: 4 }`, () => {
        args = {
          from: A,
          to: C,
          exactStops: 4,
          show: true,
        };
        expect(graph.numRoutes(args)).to.equal(3);
      });
    });

    describe('_exactStopsRecursive', () => {
      it('exists', () => {
        expect(graph._exactStopsRecursive).to.be.a('function');
      });

      it(`should return 3 when numRoutes is called with { from: '${A}', to: '${C}', exactStops: 4, recursive: true }`, () => {
        args = {
          from: A,
          to: C,
          exactStops: 4,
          recursive: true,
          show: true,
        };
        expect(graph.numRoutes(args)).to.equal(3);
      });
    });

    describe('_maxDistance ', () => {
      it('exists', () => {
        expect(graph._maxDistance).to.be.a('function');
      });

      it(`should return 7 when numRoutes is called with { from: '${C}', to: '${C}', maxDistance: 30 }`, () => {
        args = {
          from: C,
          to: C,
          maxDistance: 30,
          show: true,
        };
        expect(graph.numRoutes(args)).to.equal(7);
      });
    });

    // describe('_maxDistanceRecursive ', () => {
    //   it('exists', () => {
    //     expect(graph._maxDistanceRecursive).to.be.a('function');
    //   });

    //   it(`should return 7 when numRoutes is called with { from: '${C}', to: '${C}', maxDistance: 30, recursive: true }`, () => {
    //     args = {
    //       from: C,
    //       to: C,
    //       maxDistance: 30,
    //       recursive: true,
    //       show: true,
    //     };
    //     expect(graph.numRoutes(args)).to.equal(7);
    //   });
    // });
  });

  describe('shortestRoute', () => {
    it('exists', () => {
      expect(graph.shortestRoute).to.be.a('function');
    });

    it('should return undefined if there is no route', () => {
      const args = {
        from: A,
        to: F,
        show: true
      }
      expect(graph.shortestRoute(args)).to.be.undefined;
    });

    it('should return 9 as the distance of the shortest route from A to C', () => {
      const args = {
        from: A,
        to: C,
        show: true
      }
      expect(graph.shortestRoute(args)).to.equal(9);
    });

    it('should return 9 as the distance of the shortest route from B to B', () => {
      const args = {
        from: B,
        to: B,
        show: true
      }
      expect(graph.shortestRoute(args)).to.equal(9);
    });
  });
});
