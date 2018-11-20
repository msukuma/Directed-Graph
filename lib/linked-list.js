class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }

  toString() {
    return `${this.val.toString && this.val.toString()}`;
  }
}

module.exports = class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst(val) {
    const node = new Node(val);

    if (this.head) {
      node.next = this.head;
    }

    this.head = node;
  }

  removeFirst() {
    let node = this.head;

    if (node) {
      this.head = node.next;
      return node.val;
    }

    return null;
  }

  toString() {
    let cur = this.head;
    let str = 'LinkedList -';

    while (cur) {
      str += ` => ${cur.toString()}`;
      cur = cur.next;
    }

    return str;
  }
};
