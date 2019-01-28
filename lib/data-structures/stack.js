const LinkedList = require('./linked-list')

class Stack extends LinkedList {
  constructor(...values) {
    super()
    this.addFirst(...values)
  }
}

module.exports = Stack