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



/**
 * rebuildParenMap - restores a parentMap to its original state.
 *
 * @param  {LinkedList<Edge>} route
 * @param  {Map<Edge, LinkedList<Edge>>} parentMap
 */
function rebuildParenMap(route, parentMap, partial = false) {
  let parentList, parent, child;

  edge = route.removeFirst();
  while (edge) {
    parentMap.get(edge.to).addFirst(edge);
    edge = route.removeFirst();
  }
}


/**
 * isCircular - checks whether a route has a cycle in it.
 *
 * @param  {Edge} edge
 * @param  {Map<Edge, LinkedList<Edge>>} parentMap
 * @returns {boolean}
 */
function isCircular(edge, parentMap) {
  let parentList = parentMap.get(edge);
  let cur = parentList.removeFirst();
  const route = new LinkedList();
  route.addFirst(edge);

  while (cur) {
    route.addFirst(cur);
    if (cur === edge) {
      rebuildParenMap(route, parentMap);
      console.log(route);
      return true;
    }

    parentList = parentMap.get(cur);
    cur = parentList && parentList.removeFirst();
  }

  rebuildParenMap(route, parentMap);
  return false;
}

module.exports = {
  getDistance,
  rebuildParenMap,
  isCircular,
};
