const Edge = require('./edge');

// assumes data is a comma and space separated string:
//  "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7"
function loadGraph(data) {
  const adjList = new Map();
  const edges = new Set();

  data.split(', ')
      .forEach(edge => {
        edge = edge.split('');
        let [from, to, distance] = edge;
        distance = parseInt(distance);
        edge = new Edge(from, to, distance);

        edges.add(edge);

        if (adjList.has(from)) {
          adjList.get(from).push(edge);
        } else {
          adjList.set(from, [edge]);
        }
      });

  return { adjList, edges };
}

module.exports = {
  loadGraph,
};
