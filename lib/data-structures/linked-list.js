class Node {
  constructor(val) {
    this.val = val
    this.prev = this.next = null
  }

  toString () {
    let s = ''
    if (this.prev) s += `${this.prev.val} <- `
    s += `[${this.val}]`
    if (this.next) s += ` -> ${this.next.val}`
    return s
  }
}

module.exports = class LinkedList {
  constructor(...initValues) {
    this.head = this.tail = null
    this.size = 0

    if (initValues.length)
      this.add(...initValues)
  }

  add (...values) {
    if (!values.length)
      return

    let node = new Node(values[0])

    if (!this.head) {
      this.head = node
    }
    else if (this.head === this.tail) {
      this.head.next = node
      node.prev = this.head
    }
    else {
      this.tail.next = node
      node.prev = this.tail
    }

    for (let i = 1; i < values.length; i++) {
      node.next = new Node(values[i])
      node.next.prev = node
      node = node.next
    }

    this.tail = node
    this.size += values.length
  }

  addFirst (...values) {
    if (!values)
      return

    let node = new Node(values[0])

    if (!this.head) {
      this.tail = node
    }
    else if (this.head == this.tail) {
      node.next = this.head
      node.next.prev = node
    }
    else {
      node.next = this.head
      this.head.prev = node
    }

    for (let i = 1; i < values.length; i++) {
      node.prev = new Node(values[i])
      node.prev.next = node
      node = node.prev
    }

    this.head = node
    this.size += values.length
  }

  _remove (node) {
    if (!node)
      return

    if (this.head === this.tail) {
      this.head = this.tail = null
    }
    else if (node === this.head) {
      this.head = this.head.next
      this.head.prev = null
    }
    else if (node === this.tail) {
      this.tail = node.prev
      this.tail.next = null
    }
    else {
      node.prev.next = node.next
      node.next.prev = node.prev
    }
    this.size--
  }

  remove (val) {
    let node = this.head
    while (node) {
      if (node.val === val) {
        this._remove(node)
        return node.val
      }
      node = node.next
    }
  }

  removeFirst () {
    let node = this.head
    if (node) {
      this._remove(node)
      return node.val
    }
  }

  removeLast () {
    let node = this.tail
    if (node) {
      this._remove(node)
      return node.val
    }
  }

  toString () {
    let cur = this.head
    const vals = []
    while (cur) {
      vals.push(cur.toString())
      cur = cur.next
    }

    return vals.join(',')
  }
}
