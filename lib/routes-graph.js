const Graph = require('./graph')
const Queue = require('./data-structures/queue')
const PriorityQueue = require('qheap')
const Edge = require('./edge')
const { NO_ROUTE } = require('./constants')
const {
  showRoute,
  showRoutes
} = require('./helpers')

module.exports = class RoutesGraph extends Graph {
  constructor(data) {
    super(data)
  }

  /**
   * distance - Calcualtes the distance of a route.
   *
   * @param  {string} route    - A dash separated string e.g 'A-B-C'.
   * @returns {number|string}  - The distance of the route or 'NO SUCH ROUTE'.
   */
  distance (route) {
    route = route.trim()

    if (!/^[A-Z](-[A-Z])+$/.test(route)) {
      throw new Error('route must match regex /^[A-Z](-[A-Z])+$/')
    }

    const nodes = route.split('-')
    const len = nodes.length - 1
    let dist = 0

    for (let i = 0, edge; i < len; i++) {
      edge = this.getEdge(nodes[i], nodes[i + 1])
      if (!edge) return NO_ROUTE
      dist += edge.distance
    }

    return dist
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
   * @param  {boolean} show        - If true prints the routes.
   * @returns {number}             - The number of trips that match one of the 3 criteria above.
   */
  routes ({ from, to, maxStops, exactStops, maxDistance, recursive, show }) {
    if (!(maxStops || exactStops || maxDistance))
      throw new Error('maxStops, exactStops or maxDistance must have a value > 0')

    this._validateNodes(from, to)

    let method, condition
    let _routes = 0

    if (maxStops) {
      method = recursive ? this._maxStopsRecursive : this._maxStops
      condition = maxStops
    }
    else if (exactStops) {
      method = recursive ? this._exactStopsRecursive : this._exactStops
      condition = exactStops
    }
    else if (maxDistance) {
      method = recursive ? this._maxDistanceRecursive : this._maxDistance
      condition = maxDistance
    }

    if (method) {
      if (recursive) {
        const edges = this.getEdges(from)
        if (edges)
          for (let edge of edges)
            _routes += method.call(this, edge, to, condition, 0, show && [])
      } else {
        _routes = method.call(this, from, to, condition, show)
        return _routes.length
      }
    }

    return _routes
  }

  _addToTraversal (parent, list, addDist = false) {
    let clone
    let numEdges = 0
    let edges = this.getEdges(parent.to)
    if (edges) {
      for (let e of edges) {
        clone = Edge.clone(e)
        clone.parent = parent
        if (addDist)
          clone.distFromSrc += parent.distFromSrc
        list.push(clone)
        numEdges++
      }
    }

    return numEdges
  }

  _maxStops (from, to, maxStops, show) {
    let cur, numEdges, nextNumEdges
    const routes = []
    const q = new Queue()

    from = new Edge(null, from, 0)
    numEdges = this._addToTraversal(from, q)

    while (q.length && maxStops--) {
      nextNumEdges = 0
      for (let i = 0; i < numEdges; i++) {
        cur = q.dequeue()
        if (cur.to === to)
          routes.push(cur)
        nextNumEdges += this._addToTraversal(cur, q)
      }
      numEdges = nextNumEdges
    }

    if (show)
      showRoutes(routes)

    return routes
  }

  _maxStopsRecursive (cur, to, maxStops, numStops, route) {
    let numRoutes = 0
    numStops++

    if (route) route.push(cur.from)
    if (cur.to === to) {
      numRoutes++
      if (route) {
        route.push(to)
        showRoute(route)
        route.pop()
      }
    }

    if (numStops < maxStops) {
      const edges = this.getEdges(cur.to)

      if (edges)
        for (let edge of edges)
          numRoutes += this._maxStopsRecursive(edge, to, maxStops, numStops, route)

    }

    if (route) route.pop()
    return numRoutes
  }

  _exactStops (from, to, stops, show) {
    let cur, numEdges, nextNumEdges
    const routes = []
    const q = new Queue()

    from = new Edge(null, from, 0)
    numEdges = this._addToTraversal(from, q)

    while (q.length && --stops) {
      nextNumEdges = 0

      for (let i = 0; i < numEdges; i++) {
        cur = q.dequeue()
        nextNumEdges += this._addToTraversal(cur, q)
      }
      numEdges = nextNumEdges
    }

    if (stops === 0) {
      for (let i = 0; i < numEdges; i++) {
        cur = q.dequeue()
        if (cur.to === to)
          routes.push(cur)
      }
    }
    if (show)
      showRoutes(routes)
    return routes
  }

  _exactStopsRecursive (cur, to, stops, numStops, route) {
    let numRoutes = 0
    if (route) route.push(cur.from)
    numStops++

    if (numStops === stops) {
      if (cur.to === to) {
        numRoutes++
        if (route) {
          route.push(to)
          showRoute(route)
          route.pop()
        }
      }
    } else {
      const edges = this.getEdges(cur.to)

      if (edges)
        for (let edge of edges)
          numRoutes += this._exactStopsRecursive(edge, to, stops, numStops, route)
    }

    if (route) route.pop()
    return numRoutes
  }

  _maxDistance (from, to, maxDistance, show) {
    const routes = []
    const q = new PriorityQueue({ comparBefore: (a, b) => a.distance < b.distance })
    let cur

    from = new Edge(null, from, 0)
    this._addToTraversal(from, q, true)

    while (q.size()) {
      cur = q.dequeue()

      if (cur.distFromSrc < maxDistance) {
        if (cur.to === to)
          routes.push(cur)
        this._addToTraversal(cur, q, true)
      }
    }
    if (show)
      showRoutes(routes)

    return routes
  }

  _maxDistanceRecursive (cur, to, maxDistance, distance, route) {
    let numRoutes = 0
    if (route) route.push(cur.from)
    distance += cur.distance

    if (distance < maxDistance) {
      if (cur.to === to) {
        numRoutes++

        if (route) {
          route.push(to)
          console.log(route.join('-'))
          route.pop()
        }
      }

      const edges = this.getEdges(cur.to)
      if (edges)
        for (let edge of edges)
          numRoutes += this._maxDistanceRecursive(edge, to, maxDistance, distance, route)

    }

    if (route) route.pop()
    return numRoutes
  }

  /**
   * shortestRoute - Finds the number of shortest routes from 'from' to 'to' in
   *                 terms of distance.
   *
   * @param  {string} from        - String of length 1 e.g 'A'.
   * @param  {string} to          - String of length 1 e.g 'A'.
   * @param  {number} maxDistance - When to stop looking. Default 30
   * @param  {boolean} show       - if true prints route. Default false
   * @returns {number}            - Distance of shortest route or -1 if route does not exist.
   */
  shortestRoute ({ from, to, maxDistance = 30, show = false }) {
    this._validateNodes(from, to)
    const routes = this._maxDistance(from, to, maxDistance)
    const route = routes[0];
    if (show)
      showRoute(route)
    return route && route.distFromSrc;
  }
}

module.exports.util = require('./util')
