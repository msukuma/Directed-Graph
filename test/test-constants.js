const path = require('path');
const { NO_ROUTE } = require('../lib/constants');
const dataPath = path.join(__dirname, '..', 'data', 'sample-data.txt');
module.exports = {
  NO_ROUTE,
  dataPath,
  DATA: 'A B 5, B C 4, C D 8, D C 8, D E 6, A D 5, C E 2, E B 3, A E 7',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
};
