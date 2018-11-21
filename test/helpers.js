const {
  getDistance,
  rebuildParenMap,
  isCircular,
} = require('../lib/helpers');
const Edge = require('../lib/edge');
const LinkedList = require('../lib/linked-list');
const { A, C, D, E } = require('./test-constants');
const { expect } = require('chai');

const AC = new Edge(A, C, 2);
const CD = new Edge(C, D, 2);
const DA = new Edge(D, A, 2);
const AD = new Edge(A, D, 2);
const DE = new Edge(D, E, 2);
let map, route;

function testRebuild() {
  expect(map.get(C).head.val).to.equal(AC);
  expect(map.get(D).head.val).to.equal(AD);
  expect(map.get(D).head.next.val).to.equal(CD);
  expect(map.get(A).head.val).to.equal(DA);
  expect(map.get(E).head.val).to.equal(DE);
}

describe('helpers', () => {
  beforeEach(() => {
    map = new Map();
    map.set(C, new LinkedList(AC));
    map.set(D, new LinkedList(AD, CD));
    map.set(A, new LinkedList(DA));
    map.set(E, new LinkedList(DE));
    route = new LinkedList(AC, CD, DA, AD, DE);
  });

  describe('getDistance', () => {
    it('should return the distance from the end of a route to its origin', () => {
      const distance = getDistance(DE, map);
      expect(distance).to.equal(10);
    });
  });
});
