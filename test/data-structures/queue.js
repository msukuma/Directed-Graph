const LinkedList = require('../../lib/data-structures/linked-list');
const Queue = require('../../lib/data-structures/queue')
const { expect } = require('chai');

describe('Queue', () => {
  let q;
  before(() => { q = new Queue(); });

  describe('constructor', () => {
    it('should create a Queue instance', () => {
      expect(q).to.be.an.instanceof(Queue);
    });

    it('should be create an empty q', () => {
      expect(q.size).to.eq(0);
    });

    it('should add initial values if passed', () => {
      q = new Queue(1, 2, 3, 4);
      expect(q.size).to.eq(4);
    });
  });

  describe('enqueue', () => {
    it('should alias method add from LinkedList prototype', () => {
      expect(Queue.prototype.enqueue).to.eq(LinkedList.prototype.add)
    })
  })

  describe('dequeue', () => {
    it('should alias method removeFirst from LinkedList prototype', () => {
      expect(Queue.prototype.dequeue).to.eq(LinkedList.prototype.removeFirst)
    })
  })
});