const LinkedList = require('../../lib/data-structures/linked-list')
const { expect } = require('chai')

describe('LinkedList', () => {
  let list

  describe('constructor', () => {
    before(() => { list = new LinkedList() })
    it('should create a LinkedList instance',
      () => expect(list).to.be.an.instanceof(LinkedList))
    it('should create a LinkedList with a head',
      () => expect(list).to.have.own.property('head'))
    it('should create a LinkedList with a size',
      () => expect(list).to.have.own.property('size'))
    it('should be create an empty list',
      () => expect(list.size).to.eq(0))
    it('should add initial values if passed', () => {
      list = new LinkedList(1, 2, 3, 4)
      expect(list.size).to.eq(4)
    })
  })

  describe('add', () => {
    let u, t, m
    before(() => {
      u = 1
      d = 2
      t = 3
      list = new LinkedList()
    })

    it('exists',
      () => expect(list.add).to.be.a('function'))

    describe('adding val to an empty list correctly', () => {
      before(() => list.add(u))
      it('should update head to point to new node',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.head).to.eq(list.tail))
      it('should set head.prev to null',
        () => expect(list.head.prev).to.be.null)
      it('should set head.next to null',
        () => expect(list.head.next).to.be.null)
    })

    describe('add to a list of size 1', () => {
      before(() => list.add(d))
      it('should not change head',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.tail.val).to.eq(d))
      it('should update head.next to point to tail',
        () => expect(list.head.next).to.eq(list.tail))
      it('should update tail.prev to point to head',
        () => expect(list.tail.prev).to.eq(list.head))
      it('should set tail.next to null',
        () => expect(list.tail.next).to.be.null)
    })

    describe('add to a list of size 2 or greater', () => {
      before(() => list.add(t))
      it('should not change head',
        () => expect(list.head.val).to.eq(u))
      it('should not change head.next',
        () => expect(list.head.next.val).to.eq(d))
      it('should update tail to point to new node',
        () => expect(list.tail.val).to.eq(t))
      it('should set the new node.prev to point to last tail ref',
        () => expect(list.tail.prev).to.eq(list.head.next))
      it('should update the prev tail.next to point to new tail',
        () => expect(list.head.next.next).to.eq(list.tail))
    })

    describe('...values', () => {
      before(() => {
        list = new LinkedList()
        list.add(1, 2, 3)
      })

      it('should add values to the tail of the list', () => {
        expect(list.tail.val).to.eq(3)
        expect(list.tail.prev.val).to.eq(2)
        expect(list.tail.prev.prev.val).to.eq(1)
        expect(list.tail.prev.prev).to.eq(list.head)
      })

      it('should increment size',
        () => expect(list.size).to.eq(3))
    })
  })

  describe('addFirst', () => {
    before(() => { list = new LinkedList() })

    it('exists', () => {
      expect(list.addFirst).to.be.a('function')
    })

    it('should add input to the head of the list', () => {
      const val = 5
      list.addFirst(val)
      expect(list.head.val).to.eq(val)
    })

    it('should increment size', () => {
      expect(list.size).to.eq(1)
    })

    describe('...values', () => {
      it('should add variable number of values to the head of the list', () => {
        list.addFirst(4, 3, 2, 1)
        expect(list.head.val).to.eq(1)
      })

      it('should increment size', () => {
        expect(list.size).to.eq(5)
      })
    })
  })

  describe('remove', () => {
    before(() => list = new LinkedList(9, 2, 4, 5, 2))

    it('exists', () => {
      expect(list.remove).to.be.a('function')
    })

    it('should remove and return the first item that equals input', () => {
      const val = 2
      expect(list.remove(val)).to.eq(val)
    })

    it('should decrement size', () => {
      expect(list.size).to.eq(4)
    })

    it('should return undefined it value is not in the list', () => {
      const val = -1
      expect(list.remove(val)).to.be.undefined
    })
  })

  describe('removeFirst', () => {
    before(() => list = new LinkedList())

    it('exists', () => {
      expect(list.removeFirst).to.be.a('function')
    })

    it('should return undefined if list is empty', () => {
      expect(list.removeFirst()).to.be.undefined
    })

    it('should remove and return the first item in the list', () => {
      const val = 9
      list.add(val, 2, 4, 5, 2)
      expect(list.removeFirst()).to.eq(val)
    })

    it('should update reference to head', () => {
      expect(list.head.val).to.eq(2)
    })

    it('should decrement size', () => {
      expect(list.size).to.eq(4)
    })
  })

  describe('removeLast', () => {
    before(() => list = new LinkedList())

    it('exists', () => {
      expect(list.removeLast).to.be.a('function')
    })

    it('should return undefined if list is empty', () => {
      expect(list.removeLast()).to.be.undefined
    })

    it('should remove and return the last item in the list', () => {
      const val = 9
      list.add(1, 2, 4, 5, val)
      expect(list.removeLast()).to.eq(val)
    })

    it('should update reference to tail', () => {
      expect(list.tail.val).to.eq(5)
    })

    it('should decrement size', () => {
      expect(list.size).to.eq(4)
    })
  })
})
