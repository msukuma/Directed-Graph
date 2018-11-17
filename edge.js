module.exports = class Edge {
  constructor(from, to, distance) {
    if (from === to) {
      throw new Error(`An Edge's "from" must be diffrent from its "to"`);
    }

    this.from = from;
    this.to = to;
    this.distance = distance;
  }
};
