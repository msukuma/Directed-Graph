const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * loadGraph - populates a graph from a file whose content consists of
 *                  newline separated values in the form [FROM][TO][DISTANCE]
 *                  e.g AB5\nBC6\n
 *
 * @param  {string} pathToData - path to the data file
 * @param  {Graph} graph - an instance of the Graph class
 * @returns {Promise}
 */
function loadGraph (pathToData, graph) {
  return new Promise((resolve, reject) => {

    const rl = readline.createInterface({
      input: fs.createReadStream(pathToData),
      crlfDelay: Infinity,
    });

    rl.on('line', (edge) => {
      let [from, to, dist] = edge.trim().split(' ');
      dist = parseInt(dist);
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
 * loadGraphSync - populates a graph from a string
 *
 * @param  {string} data - comma and space separated values in the form [FROM][TO][DISTANCE]
 *                         e.g AB5, BC6
 * @param  {type} graph description
 * @returns {type}       description
 */
function loadGraphSync (data, graph) {
  data = data.split(', ');

  for (let i = 0; i < data.length; i++) {
    let [from, to, dist] = data[i].trim().split(' ');
    dist = parseInt(dist);

    graph.addEdge(from, to, dist);
  }
}


/**
 * genData - generates graph data and saves data in the data folder
 *
 * @param  {string} s - one of ['s', 'm', 'l']
 */
function genData (s) {
  const small = 70;
  const mid = 90;
  const large = 1000;
  let size;
  let jump = 1;

  if (s === 's') {
    size = small;
  } else if (s === 'm') {
    size = mid;
    jump = 2;
  } else if (s === 'l') {
    size = large;
    jump = 20;
  } else {
    throw new Error('size not one of [s, m, l]');
  }

  const ws = fs.createWriteStream(path.join(__dirname, '..', 'data', `graph-${s}.txt`));

  for (let i = 65, from, to, dist; i < size; i++) {
    from = String.fromCodePoint(i);
    to = String.fromCodePoint(i + 1);
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

  return new Promise((res) => {
    ws.end(() => res(ws.path));
  });
}

module.exports = {
  loadGraph,
  loadGraphSync,
  genData,
};
