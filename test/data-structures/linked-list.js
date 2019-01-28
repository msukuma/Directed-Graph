const LinkedList = require('../../lib/data-structures/linked-list')
const { expect } = require('chai')

describe('LinkedList', () => {
  let u, d, t, q, size, list, values
  const testRefs = () => {
    let cur = list.head

    values.forEach(val => {
      expect(cur.val).to.eq(val)
      cur = cur.next
    })
    expect(cur).to.be.null

    cur = list.tail
    values.reverse()
    values.forEach(val => {
      expect(cur.val).to.eq(val)
      cur = cur.prev
    })
    expect(cur).to.be.null
  }

  before(() => {
    u = 1
    d = 2
    t = 3
    q = 4
    size = t
  })

  describe('constructor', () => {
    before(() => {
      values = [u, d, t]
      list = new LinkedList()
    })
    it('should create a LinkedList instance',
      () => expect(list).to.be.an.instanceof(LinkedList))
    it('should create a LinkedList with a head',
      () => expect(list).to.have.own.property('head'))
    it('should create a LinkedList with a length prop',
      () => expect(list).to.have.own.property('length'))
    it('should be create an empty list',
      () => expect(list.length).to.eq(0))
    it('should add initial values if passed', () => {
      list = new LinkedList(...values)
      expect(list.length).to.eq(values.length)
    })
  })

  describe('add', () => {
    before(() => list = new LinkedList())

    it('exists',
      () => expect(list.add).to.be.a('function'))

    describe('adding val to an empty list correctly', () => {
      before(() => {
        values = [u]
        list.add(u)
      })
      it('should update head to point to new node',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.head).to.eq(list.tail))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add to a list of size 1', () => {
      before(() => {
        values = [u, d]
        list.add(d)
      })
      it('should not change head',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.tail.val).to.eq(d))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add to a list of size 2 or greater', () => {
      before(() => {
        values = [u, d, t]
        list.add(t)
      })
      it('should not change head',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.tail.val).to.eq(t))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add(...values)', () => {
      before(() => {
        list = new LinkedList()
        values = [u, d, t, q]
        size = values.length
        list.add(...values)
      })

      it("sets the head's value to that of the first value added",
        () => expect(list.head.val).to.eq(u))
      it("sets the tail's value to that of the last value added",
        () => expect(list.tail.val).to.eq(q))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)

      it('should increment size',
        () => expect(list.length).to.eq(size))
    })
  })

  describe('addFirst', () => {
    before(() => { list = new LinkedList() })

    it('exists', () => {
      expect(list.addFirst).to.be.a('function')
    })

    describe('adding val to an empty list correctly', () => {
      before(() => {
        values = [u]
        list.add(u)
      })
      it('should update head to point to new node',
        () => expect(list.head.val).to.eq(u))
      it('should update tail to point to new node',
        () => expect(list.tail.val).to.eq(u))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add to a list of size 1', () => {
      before(() => {
        values = [d, u]
        list.addFirst(d)
      })
      it('should update head to point to new node',
        () => expect(list.head.val).to.eq(d))
      it('should not change tail',
        () => expect(list.tail.val).to.eq(u))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add to a list of size 2 or greater', () => {
      before(() => {
        values = [t, d, u]
        list.addFirst(t)
      })

      it('should update head to point to new node',
        () => expect(list.head.val).to.eq(t))
      it('should not change tail',
        () => expect(list.tail.val).to.eq(u))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })

    describe('add(...values)', () => {
      before(() => {
        values = [u, d, t]
        list = new LinkedList()
        list.addFirst(...values)
        values.reverse()
      })

      it('should set head to point the last value added',
        () => expect(list.head.val).to.eq(t))
      it('should set tail to point to the first valued added',
        () => expect(list.tail.val).to.eq(u))
      it('should increment size',
        () => expect(list.length).to.eq(values.length))
      it('should set next and prev refs properly', testRefs)
    })
  })

  describe('remove', () => {
    before(() => {
      values = [u, d, t, q]
      list = new LinkedList(...values)
    })
    it('exists',
      () => expect(list.remove).to.be.a('function'))
    it('should remove and return the first item that equals input',
      () => expect(list.remove(d)).to.eq(d))
    it('should decrement size', () => {
      values.splice(values.indexOf(d), 1);
      expect(list.length).to.eq(values.length)
    })
    it('should set next and prev refs properly', testRefs)
    it('should return undefined it value is not in the list',
      () => expect(list.remove(-1)).to.be.undefined)
    it('should return undefined if list is empty', () => {
      list = new LinkedList();
      expect(list.removeFirst()).to.be.undefined
    })
  })

  describe('removeFirst', () => {
    before(() => {
      values = [u, d, t, q]
      list = new LinkedList(...values)
    })

    it('exists',
      () => expect(list.removeFirst).to.be.a('function'))
    it('should remove and return the first item in the list',
      () => expect(list.removeFirst()).to.eq(u))
    it('should update head',
      () => expect(list.head.val).to.eq(d))
    it('should decrement size', () => {
      values.shift();
      expect(list.length).to.eq(values.length)
    })
    it('should set next and prev refs properly', testRefs)
    it('should return undefined it value is not in the list',
      () => expect(list.remove(-1)).to.be.undefined)
    it('should return undefined if list is empty', () => {
      list = new LinkedList()
      expect(list.removeFirst()).to.be.undefined
    })
  })

  describe('removeLast', () => {
    before(() => {
      values = [u, d, t, q]
      list = new LinkedList(...values)
    })
    it('exists',
      () => expect(list.removeLast).to.be.a('function'))
    it('should remove and return the last item in the list',
      () => expect(list.removeLast()).to.eq(q))
    it('should update tail',
      () => expect(list.tail.val).to.eq(t))
    it('should decrement size', () => {
      values.pop();
      expect(list.length).to.eq(values.length)
    })
    it('should set next and prev refs properly', testRefs)
    it('should return undefined it value is not in the list',
      () => expect(list.remove(-1)).to.be.undefined)
    it('should return undefined if list is empty', () => {
      list = new LinkedList()
      expect(list.removeLast()).to.be.undefined
    })
  })

  describe('aliases', () => {
    before(() => list = new LinkedList())

    describe('unshift', () => {
      it('should alias addFirst',
        () => expect(list.unshift).to.eq(list.addFirst))
    })
    describe('shift', () => {
      it('should alias removeFirst',
        () => expect(list.shift).to.eq(list.removeFirst))
    })
    describe('push', () => {
      it('should alias add',
        () => expect(list.push).to.eq(list.add))
    })
    describe('pop', () => {
      it('should alias removeLast',
        () => expect(list.pop).to.eq(list.removeLast))
    })
  })

  describe('iterator', () => {
    before(() => {
      values = [u, d, t, q]
      list = new LinkedList(...values)
    })

    it('should iterate over linked list', () => {
      const i = list.iterator();
      values.forEach(value => {
        expect(i.next().value).to.eq(value)
      })
      expect(i.next().done).to.be.true
    })

    it('should not alter next and prev refs', testRefs)
  })
})
