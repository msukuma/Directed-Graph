const LinkedList = require('../lib/linked-list');
const { assert, expect } = require('chai');

describe('LinkedList', () => {
  let list;

  beforeEach(() => { list = new LinkedList(); });

  describe('constructor', () => {
    it('should create a LinkedList instance', () => {
      expect(list).to.be.an.instanceof(LinkedList);
    });

    it('should create a LinkedList with a head', () => {
      expect(list).to.have.own.property('head');
    });

    it('should create a LinkedList with a size', () => {
      expect(list).to.have.own.property('size');
    });

    it('should be create an empty list', () => {
      expect(list.size).to.equal(0);
    });

    it('should add initial values if passed', () => {
      list = new LinkedList(...[1, 2, 3, 4]);
      expect(list.size).to.equal(4);
    });

  });

  describe('addFirst', () => {
    it('should exists', () => {
      expect(list.addFirst).to.be.a('function');
    });

    it('should add input to the head of the list', () => {
      const val = 1;
      list.addFirst(val);
      expect(list.head.val).to.equal(val);
    });
  });

  describe('removeFirst', () => {
    it('should exists', () => {
      expect(list.removeFirst).to.be.a('function');
    });

    it('should remove the first item in the list', () => {
      const newval = 2;
      list.addFirst(newval);

      expect(list.removeFirst()).to.equal(newval);
    });
  });

  describe('addAll', () => {
    it('should exists', () => {
      expect(list.addAll).to.be.a('function');
    });

    it('should remove the first item in the list', () => {
      const values = [4, 3, 2, 1];
      list.addAll(...values);

      values.forEach(v => {
        expect(v).to.equal(list.removeFirst());
      });
    });
  });
});
