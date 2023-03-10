import { Module } from '$lib/graph/highs.js'

let highs_solve = async function (problem) {
    const highs = await Module();
    let s = highs.solve(problem)
    return s
}

export async function solveGraph(graph) {
    let constraints = ""
    let solution
    let multicutIsSolution
    let constraintsList: string[] = []
    let n = 0
    do {
        const { multicut, objectiveValue, variables, problem } = await solveLP(graph, constraints)

        //console.log("multicut: " + JSON.stringify(multicut))
        //console.log("objectiveValue: " + JSON.stringify(objectiveValue))

        let nodeLabeling = Array(graph.nodes.length).fill(-1)
        let label = 0
        while (nodeLabeling.includes(-1)) {
            let visitNodes = [nodeLabeling.findIndex((x) => x == -1)] // push unlabeled node to array for visiting
            while (visitNodes.length > 0) {
                let nodeIndex = visitNodes.pop()!
                if (nodeLabeling[nodeIndex] != label) {
                    nodeLabeling[nodeIndex] = label
                    // add all nodes which are not cut off to visit nodes
                    for (let i = 0; i < graph.links.length; ++i) {
                        if (multicut[i] == 1) {
                            if (graph.links[i].source == graph.nodes[nodeIndex].id) {
                                visitNodes.push(graph.nodes.findIndex((n) => n.id == graph.links[i].target))
                            }
                            if (graph.links[i].target == graph.nodes[nodeIndex].id) {
                                visitNodes.push(graph.nodes.findIndex((n) => n.id == graph.links[i].source))
                            }
                        }
                    }
                }
            }
            // cluster finished, start next cluster
            label += 1
        }

        //console.log("graph nodes: " + JSON.stringify(graph.nodes.map(n => n.id)))
        //console.log("nodeLabeling: " + JSON.stringify(nodeLabeling))

        multicutIsSolution = true
        for (let i = 0; i < graph.links.length; ++i) {
            if (multicut[i] == 0 &&
                nodeLabeling[graph.nodes.findIndex((n) => n.id == graph.links[i].source)]
                == nodeLabeling[graph.nodes.findIndex((n) => n.id == graph.links[i].target)]) {
                let path = bfs(graph, multicut, i)
                let constraint = path.map((j) => (variables[j])).join(" + ") + " - " + variables[i] + " <= " + (path.length - 1)
                constraintsList.push("constraint" + (constraintsList.length) + ": " + constraint)
                multicutIsSolution = false
            }
        }
        constraints = constraintsList.join("\n")
        solution = { multicut, objectiveValue, problem }
        n += 1
    } while (!multicutIsSolution && n < 3)
    //console.log("complete solving steps: " + n)
    //console.log("vars: " + JSON.stringify(graph.links.map(l => l.value)))
    //console.log("problem: " + solution.problem)

    return solution
}

async function solveLP(graph, constraints) {
    let obj = ""
    let variables = []
    for (let i = 0; i < graph.links.length; i++) {
        let variable = 'x' + i
        let value = graph.links[i].value
        variables.push(variable)
        obj += (value > 0 ? " +" : " ") + value + ' ' + variable
    }

    let problem = `Maximize
    obj: `+ obj + `
    Subject To
    `+ constraints + `
    Binaries
    `+ variables.join(' ') + `
    End`

    //console.log(problem)

    const solution = await highs_solve(problem)

    let multicut = []

    for (let i = 0; i < variables.length; i++) {
        multicut.push(solution['Columns'][variables[i]]['Primal'])
    }

    //console.log(JSON.stringify(solution))

    return { multicut, objectiveValue: solution['ObjectiveValue'], variables, problem }
}

function bfs(graph, multicut, index) {
    let start = graph.nodes.findIndex((n) => n.id == graph.links[index].source)
    let end = graph.nodes.findIndex((n) => n.id == graph.links[index].target)

    //A Queue to manage the nodes that have yet to be visited
    let queue = [];
    //Adding the node to start from
    queue.push(start);
    //A boolean array indicating whether we have already visited a node
    let visited = [];
    //(The start node is already visited)
    visited[start] = true;
    let paths = []
    paths[start] = []
    //While there are nodes left to visit...
    while (queue.length > 0) {
        let node = queue.shift();
        //...for all neighboring nodes that haven't been visited yet....
        for (let i = 0; i < graph.links.length; i++) {
            if (multicut[i] == 1 && graph.links[i].source == graph.nodes[node].id && !visited[graph.nodes.findIndex((n) => n.id == graph.links[i].target)]) {
                // Do whatever you want to do with the node here.
                // Visit it, set the distance and add it to the queue
                let newNode = graph.nodes.findIndex((n) => n.id == graph.links[i].target)
                visited[newNode] = true
                paths[newNode] = paths[node].slice()
                paths[newNode].push(i)
                queue.push(newNode)
            }
            if (multicut[i] == 1 && graph.links[i].target == graph.nodes[node].id && !visited[graph.nodes.findIndex((n) => n.id == graph.links[i].source)]) {
                // Do whatever you want to do with the node here.
                // Visit it, set the distance and add it to the queue
                let newNode = graph.nodes.findIndex((n) => n.id == graph.links[i].source)
                visited[newNode] = true
                paths[newNode] = paths[node].slice()
                paths[newNode].push(i)
                queue.push(newNode)
            }
        }

        if (paths[end]) {
            return paths[end]
        }
    }
}