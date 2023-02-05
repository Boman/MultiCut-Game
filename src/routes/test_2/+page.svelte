<script lang="ts">
    let problem = `Maximize
        obj: + 0.6 x1 + 0.5 x2
        Subject To
        cons1: + x1 + 2 x2 <= 1
        cons2: + 3 x1 + x2 <= 2
        End`
    let solutionElement = ''

    function solveLpProblem(lpProblem) {
        const lpSolution = Module.solve(lpProblem, 9)
        return lpSolution
    }
    function solveProblemFromFromLP() {
        const solution = solveLpProblem(problem)
        const solObj = JSON.parse(solution)
        for (let i in solObj)
            if (typeof solObj[i] == 'string' && solObj[i].length > 25) {
                solObj[i] = Module.bnRound(solObj[i])
            }
        solutionElement = JSON.stringify(solObj, null, 4)
    }
</script>

<div class="container-fluid">
    <div class="row h-50">
        <div class="col">
            <h5>Problem in CPLEX LP format</h5>
            <textarea id="lpProblem" rows="18" bind:value={problem} />
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button on:click={solveProblemFromFromLP}>Solve Linear Problem</button>
        </div>
    </div>
    <div class="row h-50">
        <div class="col">
            <h5>Solution</h5>
            <textarea id="solution" rows="18" bind:value={solutionElement} />
        </div>
    </div>
</div>
