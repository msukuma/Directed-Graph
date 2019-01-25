import io


def load_graph(data_path, graph):
    """Loads graph from a data file
    """

    with io.open(data_path, newline='\n') as f:
        for line in f:
            fro, to, dist = line.strip().split(' ')
            graph.add_edge(fro, to, int(dist))


if __name__ == "__main__":
    import doctest
    doctest.testmod()
