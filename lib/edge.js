/**
 * Edge - a class to represent an edge from 'from' to 'to' of distance 'distance'
 */
module.exports = class Edge {

  /**
   * constructor -
   *
   * @param  {string} from      - String of length 1 e.g 'A'.
   * @param  {string} to        - String of length 1 e.g 'A'.
   * @param  {number} distance  - distance from 'from' to 'to'
   */
  constructor(from, to, distance) {
    if (from === to) {
      throw new Error(`An Edge's "from" must be diffrent from its "to"`);
    }

    this.from = from;
    this.to = to;
    this.distance = distance;
  }

  toString() {
    return `${this.from}${this.to}${this.distance}`;
  }
};
