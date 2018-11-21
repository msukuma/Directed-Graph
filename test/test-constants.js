const path = require('path');
const { NO_ROUTE } = require('../lib/constants');
const dataPath = path.join(__dirname, '..', 'data', 'sample-data.txt');
module.exports = {
  NO_ROUTE,
  dataPath,
  DATA: 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
};
