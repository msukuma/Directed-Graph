const fs = require('fs');
const path = require('path');
const readline = require('readline');
const FROM = 0;
const TO = 1;
const DIST = 2;


/**
 * loadGraph - populates a graph from a string
 *
 * @param  {string} data - comma and space separated values in the form [FROM][TO][DISTANCE]
 *                         e.g AB5, BC6
 * @param  {type} graph description
 * @returns {type}       description
 */
function loadGraph(data, graph) {
  data = data.split(', ');

  for (let i = 0, e, from, to, dist; i < data.length; i++) {
    e = data[i];
    from = e[FROM];
    to = e[TO];
    dist = parseInt(e.substring(DIST));

    graph.addEdge(from, to, dist);
  }
}

/**
 * loadGraphAsync - populates a graph from a file whose content consists of
 *                  newline separated values in the form [FROM][TO][DISTANCE]
 *                  e.g AB5\nBC6\n
 *
 * @param  {string} pathToData - path to the data file
 * @param  {Graph} graph - an instance of the Graph class
 * @returns {Promise}
 */
function loadGraphAsync(pathToData, graph) {
  return new Promise((resolve, reject) => {

    const rl = readline.createInterface({
      input: fs.createReadStream(pathToData),
      crlfDelay: Infinity,
    });

    rl.on('line', (edge) => {
      from = edge[FROM];
      to = edge[TO];
      dist = parseInt(edge.substring(DIST));
      graph.addEdge(from, to, dist);
    });

    rl.on('close', () => {
      resolve(graph);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}


/**
 * genData - generates graph data and saves data in the data folder
 *
 * @param  {string} s - one of ['s', 'm', 'l']
 */
function genData(s) {
  const small = 70;
  const mid = 90;
  const large = 1000;
  let size;
  let jump = 1;

  if (s === 's') {
    size = small;
  } else if (s === 'm') {
    size = mid;
  } else if (s === 'l') {
    size = large;
    jump = 20;
  } else {
    throw new Error('size not one of [s, m, l]');
  }

  const ws = fs.createWriteStream(path.join(__dirname, 'data', `graph-${s}.txt`));

  for (let i = 65, from, to, dist; i < size; i++) {
    from  = String.fromCodePoint(i);
    to  = String.fromCodePoint(i + 1);
    dist = Math.floor(Math.random() * 24);
    ws.write(`${from}${to}${dist}` + '\n');

    for (let j = 65; j < size; j += jump) {
      if (j !== i && j !== i + 1) {
        to = String.fromCodePoint(j);
        if (to.length === 1) {
          dist = Math.floor(Math.random() * 24);
          ws.write(`${from}${to}${dist}` + '\n');
        }
      }
    }
  }

  ws.end();
}

module.exports = {
  loadGraph,
  loadGraphAsync,
  genData,
};
