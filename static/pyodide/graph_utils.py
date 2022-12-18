import networkx as nx
from networkx.readwrite import json_graph
import numpy as np

def createGridGraph(gridSize=10):
    graph = nx.grid_graph((gridSize, gridSize))
    np.random.seed(2)
    bias = 0.3
    costs = {}
    for u, v in graph.edges():
        p = np.random.random()
        p = 1 / (1 + (1 - p) / p * bias / (1 - bias))
        costs[u, v] = np.log(p / (1 - p))
        graph[u][v]['weight'] = costs[u, v]
    return graph

def main():
    # create graph with random edge costs
    graph = createGridGraph(10)
        
    print(nx.node_link_data(graph))


if __name__ == "__main__":
    main()