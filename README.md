Routes Graph
=============

Setup
------
1. Clone this repo
2. `$ cd routes-graph`
3. `$ npm install`
4. `$ npm test`

Usage
-----

```JavaScript
const path = require('path');
const RoutesGraph = require('routes-graph');
const { loadGraph } = require('routes-graph').util;
const dataPath = path.join(__dirname, 'path-to-some-file.txt');

const graph = new RoutesGraph();
loadGraph(dataPath, graph).then(g => {
  console.log(g);
  const from = 'A';
  const to = 'C';
  const distance = graph.distance('A-B-C');
  const maxStops = graph.numRoutes({ from, to, maxStops: 3 });
  const exactStops = graph.numRoutes({ from, to, exactStops: 3 });
  const maxDist = graph.numRoutes({ from, to, maxDistance: 30 });
  const shortest = graph.shortestRoute(from, to);

  console.log(distance, maxStops, exactStops, maxDist, shortest);
});
```

Notes
-----
There are 2 branches to review
  1. master - implements graph using adjancency - Map<Node, Map<Node, Edge>>
  2. map-n-list - implements graph using adjancency - Map<Node, Array<Edge>>
