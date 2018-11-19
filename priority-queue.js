/**
  Most of this code was taken from https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
  why?  1- implementing a priority queue in js is not the purpose of this project and
        2- Java has a built-in implementation of said queue,
*/
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

module.exports = class PriorityQueue {
  constructor(comparator = (a, b) => a < b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this._heap.length == 0;
  }

  push(...values) {
    for (let i = 0; i < values.length; i++) {
      this._heap.push(values[i]);
      this._siftUp();
    }

    return this.size();
  }

  peek() {
    return this._heap[top];
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this._heap.length - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }

    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
};
