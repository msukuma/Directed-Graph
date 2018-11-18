const Graph = require('./graph');
const { NO_ROUTE } = require('./constants');

module.exports = class RoutesGraph extends Graph {
  constructor(data) {
    super(data);
  }

  distance(route) {
    route = route.trim();

    if (!/^[A-Z](-[A-Z])+$/.test(route)) {
      throw new Error('route must math regex /^[A-Z](-[A-Z])+$/');
    }

    const nodes = route.split('-');
    let dist = 0;

    let from, to, edge;
    let len = nodes.length - 1;

    for (let i = 0; i < len; i++) {
      from = nodes[i];
      to = nodes[i + 1];
      edge = this.getEdge(from, to);

      if (!edge) {
        return NO_ROUTE;
      }

      dist += edge.distance;
    }

    return dist;
  }

  findRoutes(from, to, maxStops) {
    const routes = [];
    const q = [];
    const parentMap = new Map();
    const visited = new Set();
    let cur, neighbors;

    q.push(from);

    while (q.length) {
      cur = q.shift();

      if (!visited.has(cur)) {
        if (cur === to) {
          routes.push(bluildRoute(cur, parentMap));
        }

        visted.add(cur);
        neighbors = this.getNeighbors(cur);

        for (let n of neighbors) {
          q.push(n);
          parentMap.set(n, cur);
        }

      }
    }
  }

  numTrips(from, to, maxStops) {
    if (maxStops < 1) { return 0; }

    return this._numTrips(cur, to, maxStops + 1, 0);
  }
  // 'A-B-D-C-E-C-F'
  _numTrips(cur, to, maxStops, numStops) {
    let trips = 0;
    if (cur === to) { trips++; }

    numStops++;

    if (numStops < maxStops) {
      const neighbors = this.getNeighbors;

      for (let n of neighbors) {
        trips += this._numTrips(n, to, numStops);
      }
    }

    return trips;
  }
};

function bluildRoute(node, parentMap) {
  let cur = node;
  let route = cur;

  while (cur) {

    cur = parentMap.get(cur);
  }
}
