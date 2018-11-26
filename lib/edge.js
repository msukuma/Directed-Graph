/**
 * Edge - a class to represent an edge from 'from' to 'to' of distance 'distance'
 */
class Edge {

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
    this.distanceFromSrc = distance;
    this.depth = 0;
  }

  toString() {
    return `${this.from}${this.to}${this.distance}`;
  }
};

Edge.clone = edge => new Edge(edge.from, edge.to, edge.distance);

module.exports = Edge;
