const Graph = require('./graph');
const PriorityQueue = require('qheap');
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
    const len = nodes.length - 1;
    let dist = 0;

    for (let i = 0, edge; i < len; i++) {
      edge = this.getEdge(nodes[i], nodes[i + 1]);
      if (!edge) return NO_ROUTE;
      dist += edge.distance;
    }

    return dist;
  }

  numRoutes({ from, to, maxStops, exactStops, maxDistance, recursive }) {
    if (!(maxStops || exactStops || maxDistance)) {
      throw new Error('one of [maxStops, exactStopsRecursive, maxDistance] must be passed a value > 0');
    }

    let method, condition;
    let routes = 0;
    let nodesOnly = true;

    if (maxStops) {
      method = recursive ? this._maxStopsRecursive : this._maxStops;
      condition = maxStops;
    }
    else if (exactStops) {
      method = recursive ? this._exactStopsRecursive : this._exactStops;
      condition = exactStops;
    }
    else if (maxDistance) {
      method = recursive ? this._maxDistanceRecursive : this._maxDistance;
      condition = maxDistance;
      nodesOnly = false;
    }

    if (method) {
      if (recursive) {
        const edges = this.getEdges(from);
        if (edges) {
          for (let edge of edges) {
            from = nodesOnly ? edge.to : edge;
            routes += method.call(this, from, to, condition, 0);
          }
        }
      } else {
        routes += method.call(this, from, to, condition);
      }
    }

    return routes;
  }

  _maxStops(from, to, maxStops) {
    let routes, stops, cur, edges, numEdges, len, next;
    const edgesAtStop = [1];
    const q = [];

    routes = stops = numEdges = 0;
    edges = this.getEdges(from);

    if (edges) {
      for (let edge of edges) {
        q.push(edge);
        numEdges++;
      }

      edgesAtStop.push(numEdges);

      while (q.length && stops < maxStops) {
        stops++;
        len = edgesAtStop[stops];
        next = stops + 1;
        edgesAtStop.push(0);

        for (let i = 0; i < len; i++) {
          cur = q.shift();
          if (cur.to === to) routes++;
          edges = this.getEdges(cur.to);

          if (edges) {
            numEdges = 0;
            for (let edge of edges) {
              q.push(edge);
              numEdges++;
            }

            edgesAtStop[next] += numEdges;
          }
        }
      }
    }

    return routes;
  }

  _maxStopsRecursive(cur, to, maxStops, numStops) {
    let routes = 0;

    if (cur === to) routes++;

    numStops++;

    if (numStops < maxStops) {
      const edges = this.getEdges(cur);

      if (edges)
        for (let edge of edges)
          routes += this._maxStopsRecursive(edge.to, to, maxStops, numStops);

    }

    return routes;
  }

  _exactStops(from, to, stops) {
    let routes, numStops, cur, edges, numEdges, len, next;
    const edgesAtStop = [1];
    const q = [];

    routes = numStops = numEdges = 0;
    edges = this.getEdges(from);

    if (edges) {
      for (let edge of edges) {
        q.push(edge);
        numEdges++;
      }

      edgesAtStop.push(numEdges);

      while (q.length && numStops < stops) {
        numStops++;
        len = edgesAtStop[numStops];
        next = numStops + 1;
        edgesAtStop.push(0);

        for (let i = 0; i < len; i++) {
          cur = q.shift();
          edges = this.getEdges(cur.to);

          if (edges) {
            numEdges = 0;
            for (let edge of edges) {
              q.push(edge);
              numEdges++;
            }

            edgesAtStop[next] += numEdges;
          }
        }
      }

      if (numStops === stops) {
        len = edgesAtStop[next];
        for (let i = 0; i < len; i++) {
          if (q[i].to === to) routes++;
        }
      }
    }

    return routes;
  }

  _exactStopsRecursive(cur, to, stops, numStops) {
    let routes = 0;

    if (numStops === stops) {
      if (cur === to) routes++;
    } else {
      numStops++;

      const edges = this.getEdges(cur);

      if (edges)
        for (let edge of edges)
          routes += this._exactStopsRecursive(edge.to, to, stops, numStops);
    }

    return routes;
  }

  _maxDistanceRecursive(cur, to, maxDistance, distance) {
    let routes = 0;

    distance += cur.distance;
    if (distance < maxDistance) {
      if (cur.to === to) {
        routes++;
      }

      const edges = this.getEdges(cur.to);
      if (edges)
        for (let edge of edges)
          routes += this._maxDistanceRecursive(edge, to, maxDistance, distance);

    }

    return routes;
  }

  shortestRoute(from, to) {
    let cur, edges, parents;
    const parentMap = new Map();
    const q = new PriorityQueue({ comparBefore: (a, b) => a.distance < b.distance });

    edges = this.getEdges(from);
    if (edges)
      for (let edge of edges)
        q.enqueue(edge);

    while (q.length) {
      cur = q.dequeue();

      if (cur.to === to)
        return getDistance(cur, parentMap);

      edges = this.getEdges(cur.to);

      if (edges) {
        for (let edge of edges) {
          q.enqueue(edge);
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

function getDistance(edge, parentMap) {
  let parents;
  let cur = edge;
  let distance = 0;

  // console.log(parentMap);

  while (cur) {
    distance += cur.distance;
    parents = parentMap.get(cur);
    if (!parents) return distance;
    cur = parents.removeFirst();
  }

  return distance;
}
