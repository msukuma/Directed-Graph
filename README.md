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
const { loadGraph } = require('./util')
const RoutesGraph = require('./routes-graph');
const dataPath = path.join(pathToData)

const graph = new RoutesGraph();
loadGraph(dataPath, graph).then(g => {
  const distance = graph.distance('A-B-C');
  const maxStops = graph.numRoutes({from: 'A', to: 'C', maxStops: 3});
  const exactStops = graph.numRoutes({from: 'A', to: 'C', exactStops: 3});
  const maxDist = graph.numRoutes({from: 'A', to: 'C', maxDistance: 30});
  const shortest = graph.shortestRoute('A','C');
})
```

Notes
-----
There are 2 branches to review
  1. master - implements graph using adjancency - Map<Node, Map<Node, Edge>>
  2. map-n-list - implements graph using adjancency - Map<Node, Array<Edge>>
