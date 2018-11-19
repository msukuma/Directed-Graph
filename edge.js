module.exports = class Edge {
  constructor(from, to, distance) {
    if (from === to) {
      throw new Error(`An Edge's "from" must be diffrent from its "to"`);
    }

    this.from = from;
    this.to = to;
    this.distance = distance;
  }

  toString() {
    return `{ from: ${this.from} to: ${this.to} distance: ${this.distance} }`;
  }
};
