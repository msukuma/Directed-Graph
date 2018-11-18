const fs = require('fs');

// assumes data is a comma and space separated string:
//  "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7"
function loadGraph(data, graph) {
  let edge;
  const DIST = 2;
  data = data.split(', ');

  for (let i = 0; i < data.length; i++) {
    edge = data[i].split('');
    edge[DIST] = parseInt(edge[DIST]);
    graph.addEdge(...edge);
  }
}

module.exports = {
  loadGraph,
};
