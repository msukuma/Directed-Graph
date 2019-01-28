const LinkedList = require('./linked-list')

class Queue extends LinkedList {
  constructor(...values) {
    super(...values)
  }
  size () {
    return this.length
  }
}
Queue.prototype.enqueue = LinkedList.prototype.add
Queue.prototype.dequeue = LinkedList.prototype.removeFirst
Queue.prototype.peak = LinkedList.prototype.first

module.exports = Queue