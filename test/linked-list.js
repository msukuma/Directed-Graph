const LinkedList = require('../lib/linked-list');
const { assert, expect } = require('chai');

describe('LinkedList', () => {
  let list, val;

  before(() => {
    list = new LinkedList();
    val = 1;
  });

  describe('constructor', () => {

    it('should create a LinkedList instance', () => {
      expect(list).to.be.an.instanceof(LinkedList);
    });

    it('should create a LinkedList with a head', () => {
      expect(list).to.have.own.property('head');
    });

  });

  describe('addFirst', () => {
    it('should exists', () => {
      expect(list.addFirst).to.be.a('function');
    });

    it('should add input to the head of the list', () => {
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
});
