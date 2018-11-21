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
  constructor(...initValues) {
    this.head = null;
    this.size = 0;

    if (initValues.length)
      this.addAll(...initValues);
  }

  addFirst(val) {
    const node = new Node(val);

    if (this.head) {
      node.next = this.head;
    }

    this.head = node;
    this.size++;
  }

  removeFirst() {
    let node = this.head;

    if (node) {
      this.head = node.next;
      this.size--;
      return node.val;
    }

    return null;
  }

  addAll(...values) {
    for (var i = values.length - 1; i > -1; i--) {
      this.addFirst(values[i]);
    }
  }

  toString() {
    let cur = this.head;
    const vals = [];
    while (cur) {
      vals.push(cur.toString());
      cur = cur.next;
    }

    return vals;
  }
};
