const LinkedList = require('./linked-list');

/**
 * getDistance - calcualtes the distance of a route from 'edge' to the route's
 *               source.
 *
 * @param  {Edge} edge
 * @param  {Map<Edge, LinkedList<Edge>>} parentMap  - A Map instance that maps its keys (edges) to their
 *                                                    parents(LinkedList of edges edges).
 * @param  {boolean} rebuild                        - If set to true, parentMap will be rebuilt.
 * @returns {number}                                - The distance
 */
function getDistance(edge, parentMap, rebuild = false) {
  let parents;
  let cur;
  let distance = 0;
  let route;

  if (rebuild) route = new LinkedList();
  parents = parentMap.get(edge.to);
  cur = parents && parents.removeFirst();
  while (cur) {
    if (rebuild) route.addFirst(cur);
    distance += cur.distance;
    parents = parentMap.get(cur.from);
    if (!parents) {
      if (rebuild) rebuildParenMap(route, parentMap);
      return distance;
    }

    cur = parents.removeFirst();
  }

  if (rebuild) rebuildParenMap(route, parentMap);
  return distance;
}

module.exports = {
  getDistance,
};
