const PriorityQueue = require('../priority-queue');
const { assert, expect } = require('chai');

describe('PriorityQueue', () => {
  let queue;

  before(() => {
    queue = new PriorityQueue();
  });

  describe('constructor', () => {

    it('should create a PriorityQueue instance', () => {
      expect(queue).to.be.an.instanceof(PriorityQueue);
    });

    it('should create a PriorityQueue with a _heap property', () => {
      expect(queue).to.have.own.property('_heap');
    });

    it('should create a PriorityQueue with a _comparator property', () => {
      expect(queue).to.have.own.property('_comparator');
    });

  });

  describe('size', () => {
    it('should exists', () => {
      expect(queue.size).to.be.a('function');
    });

    it('should the size of the queue', () => {
      expect(queue.size()).to.equal(0);
    });
  });

  describe('push', () => {
    it('should exists', () => {
      expect(queue.push).to.be.a('function');
    });

    it('should add input to the queue according to the comparator', () => {
      queue.push(3, 2, 1);

      expect(queue._heap[0]).to.equal(1);
    });
  });

  describe('isEmpty', () => {
    before(() => { queue = new PriorityQueue(); });

    it('should exists', () => {
      expect(queue.isEmpty).to.be.a('function');
    });

    it('should return true if the the queue is empty', () => {
      expect(queue.isEmpty()).to.equal(true);
    });

    it('should return false if the the queue is NOT empty', () => {
      queue.push(1);
      expect(queue.isEmpty()).to.equal(false);
    });
  });

  describe('peek', () => {
    before(() => { queue = new PriorityQueue(); });

    it('should exists', () => {
      expect(queue.peek).to.be.a('function');
    });

    it('should add return what is at the head of the queue', () => {
      queue.push(5, 1, 3);
      expect(queue.peek()).to.equal(1);
    });

    it('should not remove the head of the queue', () => {
      expect(queue._heap[0]).to.equal(1);
    });
  });

  describe('pop', () => {
    before(() => { queue = new PriorityQueue(); });

    it('should exists', () => {
      expect(queue.pop).to.be.a('function');
    });

    it('should add return what is at the head of the queue', () => {
      queue.push(5, 1, 3);
      expect(queue.pop()).to.equal(1);
    });

    it('should remove the head of the queue', () => {
      expect(queue._heap[0]).to.equal(3);
    });
  });
});
