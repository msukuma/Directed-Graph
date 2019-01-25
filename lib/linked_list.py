class Node:
    """LinkedList Node
    >>> n = Node(3)
    >>> n.value == 3
    True
    >>> n.next is None
    True
    """

    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

    def __repr__(self):
        s = ''
        if self.prev:
            s += str(self.prev.value) + ' -> '
        s += str(self.value)

        if self.next:
            s += ' -> ' + str(self.next.value)
        return s


class LinkedList:
    """A singly linked LinkedList data structure
    >>> l = LinkedList()
    """

    def __init__(self):
        # global privateAdd
        self.__size = 0
        self.__head = None
        self.__tail = None
        self.pop = self.removeLast
        self.push = self.enqueue = self.add
        self.dequeue = self.shift = self.removeFirst
        self.unshift = self.addFirst

    def size(self):
        """
        >>> l = LinkedList()
        >>> l.size()
        0
        """
        return self.__size

    def first(self):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.first()
        1
        """
        if self.__head is None:
            return None
        return self.__head.value

    def last(self):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.last()
        3
        """
        if self.__tail is None:
            return None
        return self.__tail.value

    def add(self, *values):
        """
        >>> l = LinkedList()
        >>> l.add(1, 2, 3)
        >>> l.size()
        3
        """
        if values is None:
            raise TypeError("'None' values are not premitted")

        lenValues = len(values)
        node = Node(values[0])
        if self.__head is None:
            self.__head = node
        elif self.__head is self.__tail:
            self.__head.next = node
            node.prev = self.__head
            # self.__tail = node
        else:
            self.__tail.next = node
            node.prev = self.__tail
            # self.__tail = node

        for i in range(1, lenValues):
            node.next = Node(values[i])
            node.next.prev = node
            node = node.next

        self.__tail = node
        self.__size += lenValues

    def addFirst(self, *values):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.addFirst(0)
        >>> l.first()
        0
        """
        if values is None:
            raise TypeError("'None' values are not premitted")

        lenValues = len(values)
        node = Node(values[0])
        if self.__head is None:
            self.__tail = node
        else:
            node.next = self.__head
            self.__head.prev = node
        for i in range(1, lenValues):
            node.prev = Node(values[i])
            node.prev.next = node
            node = node.prev
        self.__head = node
        self.__size += lenValues

    def __remove(self, node):
        if node is None:
            return

        if node is self.__head:
            if self.__head is self.__tail:
                self.__head = self.__tail = None
            else:
                self.__head = self.__head.next
                self.__head.prev = None
        elif node is self.__tail:
            node.prev.next = None
            self.__tail = node.prev
        else:
            node.prev.next = node.next
            node.next.prev = node.prev

        self.__size -= 1

    def remove(self, value):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.remove(2)
        2
        >>> l.size()
        2
        >>> l.first()
        1
        >>> l.last()
        3
        """
        cur = self.__head
        while cur:
            if cur.value == value:
                self.__remove(cur)
                return cur.value
            cur = cur.next
        return None

    def removeFirst(self):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.removeFirst()
        1
        >>> l.size()
        2
        >>> l.first()
        2
        """
        first = self.__head
        self.__remove(first)
        if first is not None:
            return first.value
        else:
            return None

    def removeLast(self):
        """
        >>> l = LinkedList()
        >>> l.add(1,2,3)
        >>> l.removeLast()
        3
        >>> l.size()
        2
        >>> l.last()
        2
        """
        last = self.__tail
        self.__remove(last)
        if last is not None:
            return last.value
        else:
            return None

    def __repr__(self):
        s = '['
        cur = self.__head
        while cur and cur.next:
            s += str(cur.value) + ','
            cur = cur.next
        if cur:
            s += str(cur.value)
        s += ']'
        return s


if __name__ == "__main__":
    import doctest
    doctest.testmod()
