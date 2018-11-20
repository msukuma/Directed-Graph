const fs = require('fs');
const path = require('path');
const {
  performance,
  PerformanceObserver,
} = require('perf_hooks');
const { loadGraph } = require('../util');
const dataPath = path.join(__dirname, '..', 'data', 'sample-data.txt');
const RoutesGraph = require('../routes-graph');

function time(itr) {
  const graph = new RoutesGraph();
  let n;
  loadGraph(dataPath, graph).then((g) => {
    for (var i = 0; i < itr; i++) {
      performance.mark('a');
      n = graph.numRoutes({ from: 'A', to: 'E', maxStops: 5 });
      performance.mark('b');
      performance.measure('numRoutes - maxStops', 'a', 'b');
      const measure = performance.getEntriesByName('numRoutes - maxStops')[0];
      console.log(n, measure.duration);
    }
  });
};

time(1);
