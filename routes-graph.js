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
};
