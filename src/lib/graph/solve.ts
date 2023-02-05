//import { Module } from '$lib/graph/clp-wasm.js'

export function solveGraph(graph) {
    let problem = `Maximize
        obj: + 0.6 x1 + 0.5 x2
        Subject To
        cons1: + x1 + 2 x2 <= 1
        cons2: + 3 x1 + x2 <= 2
        End`
    let solutionElement = ''
    const solution = Module.solve(problem, 9)
    const solObj = JSON.parse(solution)
    for (let i in solObj)
        if (typeof solObj[i] == 'string' && solObj[i].length > 25) {
            solObj[i] = Module.bnRound(solObj[i])
        }
    solutionElement = JSON.stringify(solObj, null, 4)
    return solutionElement
}