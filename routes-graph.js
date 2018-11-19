const Graph = require('./graph');
const PriorityQueue = require('./priority-queue');
const LinkedList = require('./linked-list');
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

  numRoutes({ from, to, maxStops, exactStops, maxDistance }) {
    if (!(maxStops || exactStops || maxDistance)) {
      throw new Error('one of [maxStops, exactStops, maxDistance] must be passed value > 0');
    }

    let method, condition;
    let trips = 0;
    let nodesOnly = true;

    if (maxStops) {
      method = this._maxStops;
      condition = maxStops;
    }
    else if (exactStops) {
      method = this._exactStops;
      condition = exactStops;
    }
    else if (maxDistance) {
      method = this._maxDistance;
      condition = maxDistance;
      nodesOnly = false;
    }

    if (method) {
      const edges = this.getEdges(from);
      if (edges) {
        for (let edge of edges) {
          n = nodesOnly ? edge.to : edge;
          trips += method.call(this, n, to, condition, 0);
        }
      }
    }

    return trips;
  }

  _maxStops(cur, to, maxStops, numStops) {
    let trips = 0;

    if (cur === to) {
      trips++;
    }

    numStops++;

    if (numStops < maxStops) {
      const edges = this.getEdges(cur);

      if (edges) {
        for (let edge of edges) {
          trips += this._maxStops(edge.to, to, maxStops, numStops);
        }
      }
    }

    return trips;
  }

  _exactStops(cur, to, stops, numStops) {
    let trips = 0;

    if (numStops === stops) {
      if (cur === to) {
        trips++;
      }
    } else {
      numStops++;

      const edges = this.getEdges(cur);

      if (edges) {
        for (let edge of edges) {
          trips += this._exactStops(edge.to, to, stops, numStops);
        }
      }
    }

    return trips;
  }

  _maxDistance(cur, to, maxDistance, distance) {
    let trips = 0;

    distance += cur.distance;
    if (distance < maxDistance) {
      if (cur.to === to) {
        trips++;
      }

      const edges = this.getEdges(cur.to);
      if (edges) {
        for (let edge of edges) {
          trips += this._maxDistance(edge, to, maxDistance, distance);
        }
      }
    }

    return trips;
  }

  shortestRoute(from, to) {
    let cur, edge, edges, parents;
    const parentMap = new Map();
    const q = new PriorityQueue((a, b) => a.distance < b.distance);

    edges = this.getEdges(from);
    if (edges) {
      q.push(...edges);
    }

    while (!q.isEmpty()) {
      cur = q.pop();

      if (cur.to === to) {
        return getDistance(cur, parentMap);
      }

      edges = this.getEdges(cur.to);

      if (edges) {
        q.push(...edges);

        for (let edge of edges) {
          edge = edge;
          parents = parentMap.get(edge);
          if (parents) {
            parents.addFirst(cur);
          } else {
            parents = new LinkedList();
            parents.addFirst(cur);
            parentMap.set(edge, parents);
          }
        }
      }
    }

    return -1;
  }
};

function getDistance(node, parentMap) {
  let parents;
  let cur = node;
  let distance = 0;

  while (true) {
    distance += cur.distance;
    parents = parentMap.get(cur);

    if (!parents) {
      return distance;
    }

    cur = parents.removeFirst();
  }
};
