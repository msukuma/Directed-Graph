const {
  getDistance,
  rebuildParenMap,
  isCircular,
} = require('../lib/helpers');
const Edge = require('../lib/edge');
const LinkedList = require('../lib/linked-list');
const { A, C, D, E } = require('./test-constants');
const { expect } = require('chai');

describe('helpers', () => {
  let map;
  const AC = new Edge(A, C, 2);
  const CD = new Edge(C, D, 2);
  const DA = new Edge(D, A, 2);
  const AD = new Edge(A, D, 2);
  const DE = new Edge(D, E, 2);

  before(() => {

    map = new Map();
    map.set(C, new LinkedList(AC));
    map.set(D, new LinkedList(AD, CD));
    map.set(A, new LinkedList(DA));
    map.set(E, new LinkedList(DE));

  });

  describe('rebuildParenMap', () => {

  });

  describe('getDistance', () => {
    it('should return the distance from the end of a route to its origin', () => {
      const distance = getDistance(DE, map);
      expect(distance).to.eq(10);
    });
  });

  describe('isCircular', () => {

  });
});
