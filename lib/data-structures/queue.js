const LinkedList = require('./linked-list')

class Queue extends LinkedList {
  constructor(...values) {
    super(...values)
  }
}
Queue.prototype.enqueue = LinkedList.prototype.add
Queue.prototype.dequeue = LinkedList.prototype.removeFirst

module.exports = Queue