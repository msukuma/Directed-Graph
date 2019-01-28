const Stack = require('../../lib/data-structures/stack')
const { expect } = require('chai')

describe('Stack', () => {
  let s
  beforeEach(() => { s = new Stack() })

  describe('constructor', () => {
    it('should create a Stack instance', () => {
      expect(s).to.be.an.instanceof(Stack)
    })

    it('should be create an empty s', () => {
      expect(s.size).to.eq(0)
    })

    it('should add initial values if passed', () => {
      s = new Stack(1, 2, 3, 4)
      expect(s.size).to.eq(4)
      expect(s.head.val).to.eq(4)
      expect(s.head.next.val).to.eq(3)
    })
  })
})
