import { glpkConstants, solve } from '$lib/graph/glpk-utils.ts'

const options = {
    msglev: glpkConstants.GLP_MSG_ALL,
    presol: true,
    cb: {
        call: progress => console.log(progress),
        each: 1
    }
}

export function solveGraph(graph) {
    let constraints = ""
    let solution
    let multicutIsSolution
    let constraintsList: string[] = []
    let n = 0
    do {
        const { multicut, variables } = solveLP(graph, constraints)
        console.log("multicut: " + multicut)

        let nodeLabeling = Array(graph.nodes.length).fill(-1)
        let label = 0
        while (nodeLabeling.includes(-1)) {
            let visitNodes = [nodeLabeling.findIndex((x) => x == -1)]
            while (visitNodes.length > 0) {
                let nodeIndex = visitNodes.pop()!
                if (nodeLabeling[nodeIndex] != label) {
                    nodeLabeling[nodeIndex] = label
                    for (let i = 0; i < graph.links.length; ++i) {
                        if (multicut[i] == 0) {
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
            label += 1
        }

        multicutIsSolution = true
        for (let i = 0; i < graph.links.length; ++i) {
            if (multicut[i] == 1 &&
                nodeLabeling[graph.nodes.findIndex((n) => n.id == graph.links[i].source)]
                == nodeLabeling[graph.nodes.findIndex((n) => n.id == graph.links[i].target)]) {
                let path = bfs(graph, multicut, i)
                let constraint = path.map((j) => variables[j]).join(" + ") + " - " + variables[i] + " >= 0"
                constraintsList.push("constraint" + (constraintsList.length) + ": " + constraint)
                multicutIsSolution = false
            }
        }
        constraints = constraintsList.join("\n")
        solution = multicut
        n += 1
    } while (n < 5 && !multicutIsSolution)

    return solution + "\n" + constraints
}

function solveLP(graph, constraints) {
    let variables = []
    for (let i = 0; i < graph.links.length; i++) {
        let variable = 'x' + i
        let value = graph.links[i].value
        variables.push({'name':variable, 'coef':value})
    }

    let problem = `Minimize
    obj: `+ obj + `
    Subject To
    `+ constraints + `
    Binaries
    `+ variables.join(' ') + `
    End`

    console.log("problem: " + problem)

    const result = solve(
        {
            name: 'LP',
            objective: {
                direction: glpkConstants.GLP_MIN,
                name: 'obj',
                vars: variables
            },
            subjectTo: [
                {
                    name: 'cons1',
                    vars: [
                        { name: 'x1', coef: 1.0 },
                        { name: 'x2', coef: 2.0 }
                    ],
                    bnds: { type: glpkConstants.GLP_UP, ub: 1.0, lb: 0.0 }
                }
            ]
        },
        options
    )

    const solution = "{'solution':''}"//solve(problem, 9)

    return { multicut: JSON.parse(solution)['solution'].map((x) => parseInt(x)), variables: variables }
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
            if (multicut[i] == 0 && graph.links[i].source == graph.nodes[node].id && !visited[graph.nodes.findIndex((n) => n.id == graph.links[i].target)]) {
                // Do whatever you want to do with the node here.
                // Visit it, set the distance and add it to the queue
                let newNode = graph.nodes.findIndex((n) => n.id == graph.links[i].target)
                visited[newNode] = true
                paths[newNode] = paths[node].slice()
                paths[newNode].push(i)
                queue.push(newNode)
            }
            if (multicut[i] == 0 && graph.links[i].target == graph.nodes[node].id && !visited[graph.nodes.findIndex((n) => n.id == graph.links[i].source)]) {
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