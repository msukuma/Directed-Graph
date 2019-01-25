from edge import Edge


class Graph():
    """Graph to reprent routes"""
    __map = {}

    def add_edge(self, fro, to, dist):
        if fro not in self.__map:
            self.__map[fro] = {}
        if to not in self.__map:
            self.__map[to] = {}
        self.__map[fro][to] = Edge(fro, to, dist)

    def has_node(self, id):
        return id in self.__map

    def has_edge(self, fro, to):
        return fro in self.__map and to in self.__map[fro]

    def get_edge(self, fro, to):
        if not self.has_edge(fro, to):
            return None
        return self.__map[fro][to]

    def get_neighbors(self, id):
        if id not in self.__map:
            return None
        return self.__map[id]

    def get_distance(self, *path):
        dist = 0
        for i in range(len(path) - 1):
            edge = self.get_edge(path[i], path[i+1])
            if not edge:
                return 'NO SUCH ROUTE'
            dist += edge.dist
        return dist
