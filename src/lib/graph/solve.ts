//import { Module } from '$lib/graph/clp-wasm.js'

export function solveGraph(graph) {
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
    Binaries
    `+ variables.join(' ') + `
    End`
    let solutionElement = ''
    const solution = Module.solve(problem, 9)
    const solObj = JSON.parse(solution)
    solutionElement = solObj['solution'].map((x) => parseInt(x))

    let nodeLabeling = Array(graph.nodes.length).fill(-1)
    let label = 0
    while (nodeLabeling.includes(-1)) {
        let visitNodes = [nodeLabeling.findIndex((x) => x == -1)]
        while (visitNodes.length > 0) {
            let nodeIndex = visitNodes.pop()
            if (nodeLabeling[nodeIndex] != label) {
                nodeLabeling[nodeIndex] = label
                for (let i = 0; i < graph.links.length; ++i) {
                    if (solutionElement[i] == 0) {
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

    return problem + "\n" + solutionElement + "\n" + nodeLabeling
}