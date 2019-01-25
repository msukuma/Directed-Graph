const LinkedList = require('../../lib/data-structures/linked-list');
const Stack = require('../../lib/data-structures/stack')
const { expect } = require('chai');

describe('Stack', () => {
  let q;
  beforeEach(() => { q = new Stack(); });

  describe('constructor', () => {
    it('should create a Stack instance', () => {
      expect(q).to.be.an.instanceof(Stack);
    });

    it('should be create an empty q', () => {
      expect(q.size).to.eq(0);
    });

    it('should add initial values if passed', () => {
      q = new Stack(1, 2, 3, 4);
      expect(q.size).to.eq(4);
      expect(q.head.val).to.eq(4)
      expect(q.head.next.val).to.eq(3)
    });
  });

  describe('push', () => {
    it('should alias method add from LinkedList prototype', () => {
      expect(Stack.prototype.push).to.eq(LinkedList.prototype.add)
    })
  })

  describe('pop', () => {
    it('should alias method removeFirst from LinkedList prototype', () => {
      expect(Stack.prototype.pop).to.eq(LinkedList.prototype.removeLast)
    })
  })
});
