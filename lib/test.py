import unittest
from util import load_graph
from graph import Graph
from os import path
DATA_PATH = path.realpath(path.join('..', 'data', 'sample-data.txt'))


class TestGraph(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.nodes = [chr(c) for c in range(65, 70)]
        cls.graph = Graph()
        load_graph(DATA_PATH, cls.graph)

    def test_loading_nodes(self):
        for node in TestGraph.nodes:
            self.assertTrue(TestGraph.graph.has_node(node))

    def test_loading_edges(self):
        edges = [('A', 'B', 5), ('B', 'C', 4), ('C', 'D', 8), ('D', 'C', 8),
                 ('D', 'E', 6), ('A', 'D', 5), ('C', 'E', 2), ('E', 'B', 3), ('A', 'E', 7)]
        for e in edges:
            fro, to, dist = e
            edge = TestGraph.graph.get_edge(fro, to)
            self.assertIsNotNone(edge)
            self.assertEqual(dist, edge.dist)


if __name__ == '__main__':
    unittest.main()
