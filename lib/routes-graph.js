const Graph = require('./graph');
const PriorityQueue = require('qheap');
const LinkedList = require('./linked-list');
const Edge = require('./edge');
const { NO_ROUTE } = require('./constants');
const {
  getDistance,
  showRoute,
} = require('./helpers');

module.exports = class RoutesGraph extends Graph {
  constructor(data) {
    super(data);
  }

  /**
   * distance - Calcualtes the distance of a route.
   *
   * @param  {string} route    - A dash separated string e.g 'A-B-C'.
   * @returns {number|string}  - The distance of the route or 'NO SUCH ROUTE'.
   */
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

  /**
   * numRoutes - Finds the number of routes that start at 'from' and end at
   *             'to' that match one of 3 criteria: maxStops, exactStops, or
   *             maxDistance.
   *
   * @param  {string} { from       - String of length 1 e.g 'A'.
   * @param  {string} to           - String of length 1 e.g 'A'.
   * @param  {number} maxStops     - Upper limit for the number of stops a route can have.
   *                                 Disregards exactStops and maxDistance
   * @param  {number} exactStops   - Exact number of stops a route must have. Disregards
   *                                 maxDistance.
   * @param  {number} maxDistance  - Upper limit for the  distance a route can have.
   * @param  {boolean} recursive   - Whether to compute maxStops or exactStops recursively. maxDistance is recursive.
   * @param  {boolean} showRoutes  - If true prints the routes.
   * @returns {number}             - The number of trips that match one of the 3 criteria above.
   */
  numRoutes({ from, to, maxStops, exactStops, maxDistance, recursive, showRoutes }) {
    if (!(maxStops || exactStops || maxDistance))
      throw new Error('maxStops or exactStopsRecursive or maxDistance must have a value > 0');

    this._validateNodes(from, to);

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
    }

    if (method) {
      if (recursive) {
        const edges = this.getEdges(from);
        if (edges) {
          for (let edge of edges) {
            routes += method.call(this, edge, to, condition, 0, showRoutes && []);
          }
        }
      } else {
        routes += method.call(this, from, to, condition, showRoutes);
      }
    }

    return routes;
  }

  /**
   * _maxStops - Finds the number of routes that are <= 'maxStops'
   *             stops away from 'from' and end at 'to'.
   *
   * @param  {string} from        - String of length 1 e.g 'A'.
   * @param  {string} to          - String of length 1 e.g 'A'.
   * @param  {number} maxStops    - Upper limit for the number of stops a route can
   *                                have.
   * @param  {boolean} showRoutes - if true prints routes
   * @returns {number}            - Number of routes that match criteria.
   */
  _maxStops(from, to, maxStops, showRoutes) {
    let routes, stops, cur, edges, numEdges, len, next;
    const parentMap = new Map();
    const edgesAtStop = [1];
    const q = [];

    routes = stops = numEdges = 0;
    edges = this.getEdges(from);
    from = new Edge(null, from, 0);

    if (edges) {
      for (let edge of edges) {
        edge = Edge.clone(edge);
        parentMap.set(edge, from);
        q.push(edge);
        numEdges++;
      }
    }

    edgesAtStop.push(numEdges);

    while (q.length && stops < maxStops) {
      stops++;
      len = edgesAtStop[stops];
      next = stops + 1;
      edgesAtStop.push(0);

      for (let i = 0; i < len; i++) {
        cur = q.shift();
        if (cur.to === to) {
          routes++;
          if (showRoutes) showRoute(cur, parentMap);
        }

        edges = this.getEdges(cur.to);

        if (edges) {
          numEdges = 0;
          for (let edge of edges) {
            edge = Edge.clone(edge);
            parentMap.set(edge, from);
            q.push(edge);
            numEdges++;
          }

          edgesAtStop[next] += numEdges;
        }
      }
    }

    return routes;
  }

  /**
   * _maxStopsRecursive - Finds the number of routes that are less than
   *                      'maxStops' stops away from 'from' and end at 'to'
   *                      recursively.
   *
   * @param  {Edge}   cur
   * @param  {string} to       - String of length 1 e.g 'A'.
   * @param  {number} maxStops - Upper limit for the number of stops a route can have.
   * @param  {number} numStops - The number of stops made so far.
   * @param  {Array}  route    - The route traversed so far.
   * @returns {number}         - Number of routes that match criteria.
   */
  _maxStopsRecursive(cur, to, maxStops, numStops, route) {
    let numRoutes = 0;

    if (route) route.push(cur.from);
    if (cur.to === to) {
      numRoutes++;
      if (route) {
        route.push(to);
        showRoute(route);
        route.pop();
      }
    }

    numStops++;

    if (numStops < maxStops) {
      const edges = this.getEdges(cur.to);

      if (edges)
        for (let edge of edges)
          numRoutes += this._maxStopsRecursive(edge, to, maxStops, numStops, route);

    }

    if (route) route.pop();
    return numRoutes;
  }

  /**
   * _exactStops - Finds the number of routes that are exaclty 'stops' stops
   *               away from 'from' and end at 'to'.
   *
   * @param  {Edge} from
   * @param  {string} to    - String of length 1 e.g 'A'.
   * @param  {number} stops - The number of stops a route must have
   * @returns {number}      - Number of routes that match criteria.
   */
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

  /**
   * _exactStopsRecursive - Finds the number of routes that are exaclty 'stops'
   *                        stops away from 'from' and end at 'to' recursively.
   *
   * @param  {Edge} cur
   * @param  {string} to       - String of length 1 e.g 'A'.
   * @param  {number} stops    - The number of stops a route must have.
   * @param  {number} numStops - The number of stops made so far.
   * @param  {Array}  route    - The route traversed so far.
   * @returns {number}         - Number of routes that match criteria.
   */
  _exactStopsRecursive(cur, to, stops, numStops, route) {
    let numRoutes = 0;
    if (route) route.push(cur.from);
    numStops++;

    if (numStops === stops) {
      if (cur.to === to) {
        numRoutes++;
        if (route) {
          route.push(to);
          showRoute(route);
          route.pop();
        }
      }
    } else {
      const edges = this.getEdges(cur.to);

      if (edges)
        for (let edge of edges)
          numRoutes += this._exactStopsRecursive(edge, to, stops, numStops, route);
    }

    if (route) route.pop();
    return numRoutes;
  }

  _maxDistance(from, to, maxDistance, showRoutes) {
    const edgesAtStop = [1];
    const q = [];
    const parentMap = new Map();
    let routes, numStops, numEdges, len, next;
    let done = false;
    let edges = this.getEdges(from);

    routes = numStops = numEdges = 0;
    from = new Edge(null, from, 0);

    for (let edge of edges) {
      edge = Edge.clone(edge);
      parentMap.set(edge, from);
      q.push(edge);
      numEdges++;
    }

    edgesAtStop.push(numEdges);

    while (q.length && !done) {
      numStops++;
      len = edgesAtStop[numStops];
      next = numStops + 1;
      edgesAtStop.push(0);
      done = true;

      for (let i = 0, cur, tmp, r; i < len; i++) {
        cur = q.shift();

        if (cur.distanceFromSrc < maxDistance) {
          if (cur.to === to) {
            routes++;
            if (showRoutes) showRoute(cur, parentMap);
          };

          done = false;
          edges = this.getEdges(cur.to);

          if (edges) {
            numEdges = 0;
            for (let edge of edges) {
              edge = Edge.clone(edge);
              q.push(edge);
              parentMap.set(edge, cur);
              edge.distanceFromSrc += cur.distanceFromSrc;
              numEdges++;
            }

            edgesAtStop[next] += numEdges;
          }
        }
      }
    }

    return routes;
  }

  /**
   * _maxDistanceRecursive - Finds the number of routes that are less than
   *                         'maxDistance' away from 'from' and end at 'to'
   *                         recursively.
   *
   * @param  {string} cur           - String of length 1 e.g 'A'.
   * @param  {string} to            - String of length 1 e.g 'A'.
   * @param  {number} maxDistance   - The number of stops a route must have.
   * @param  {number} distance      - The number of stops made so far.
   * @returns {number}              - Number of routes that match criteria.
   */
  _maxDistanceRecursive(cur, to, maxDistance, distance, route) {
    let numRoutes = 0;
    if (route) route.push(cur.from);
    distance += cur.distance;

    if (distance < maxDistance) {
      if (cur.to === to) {
        numRoutes++;

        if (route) {
          route.push(to);
          console.log(route.join('-'));
          route.pop();
        }
      }

      const edges = this.getEdges(cur.to);
      if (edges)
        for (let edge of edges)
          numRoutes += this._maxDistanceRecursive(edge, to, maxDistance, distance, route);

    }

    if (route) route.pop();
    return numRoutes;
  }

  /**
   * shortestRoute - Finds the number of shortest routes from 'from' to 'to' in
   *                 terms of distance.
   *
   * @param  {string} from - String of length 1 e.g 'A'.
   * @param  {string} to   - String of length 1 e.g 'A'.
   * @returns {number}     - Distance of shortest route or -1 if route does not exist.
   */
  shortestRoute(from, to, showRoute=false) {
    this._validateNodes(from, to);
    let cur, node, edges, parents;
    const parentMap = new Map();
    const q = new PriorityQueue({ comparBefore: (a, b) => a.distance < b.distance });

    edges = this.getEdges(from);
    if (edges) {
      for (let edge of edges) {
        q.enqueue(edge);
        parents = new LinkedList();
        parents.addFirst(edge);
        parentMap.set(edge.to, parents);
      }
    }

    while (q.length) {
      cur = q.dequeue();

      if (cur.to === to)
        return getDistance(cur, parentMap);

      edges = this.getEdges(cur.to);

      if (edges) {
        for (let edge of edges) {
          q.enqueue(edge);
          node = edge.to;
          parents = parentMap.get(node);
          if (parents) {
            parents.addFirst(edge);
          } else {
            parents = new LinkedList();
            parents.addFirst(edge);
            parentMap.set(node, parents);
          }
        }
      }
    }

    return -1;
  }

  _validateNodes(...nodes) {
    if (!this.hasNodes(...nodes)) {
      throw new Error('graph does not have one or more of the nodes provided');
    }
  }
};

module.exports.util = require('./util');
