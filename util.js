const Edge = require('./edge');

// assumes data is a comma and space separated string:
//  "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7"
function loadGraph(data) {
  const adjList = new Map();
  const edges = new Set();
  let map;

  data.split(', ')
      .forEach(edge => {
        edge = edge.split('');
        let [from, to, distance] = edge;
        distance = parseInt(distance);

        edge = new Edge(from, to, distance);

        edges.add(edge);

        if (adjList.has(from)) {
          map = adjList.get(from);
          map.set(to, edge);
        } else {
          map = new Map();
          map.set(to, edge);
          adjList.set(from, map);
        }
      });

  return { adjList, edges };
}

module.exports = {
  loadGraph,
};
