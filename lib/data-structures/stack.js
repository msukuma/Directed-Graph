const LinkedList = require('./linked-list')

class Stack extends LinkedList {
  constructor(...values) {
    super();
    this.addFirst(...values);
  }
}

Stack.prototype.push = LinkedList.prototype.add
Stack.prototype.pop = LinkedList.prototype.removeLast

module.exports = Stack