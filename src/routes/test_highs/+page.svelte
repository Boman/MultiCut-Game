<script lang="ts">
    import {onMount} from 'svelte'
    import workerURL from './worker.js?url'

    onMount(async () => {
        const lp_problem_el = document.getElementById('lp_problem')
        const solution_el = document.getElementById('solution')

        var worker = new Worker(workerURL)

        function solve() {
            const lp = lp_problem_el.value
            solution_el.innerText = 'Loading...'
            worker.postMessage(lp)
        }

        worker.onmessage = function ({data: {solution, error}}) {
            if (solution) solution_el.innerText = JSON.stringify(solution, null, '  ')
            else worker.onerror(error)
        }

        worker.onerror = function (err) {
            solution_el.innerText = `Error: ${err.message || err}`
        }

        lp_problem_el.oninput = solve
        solve()
    })
</script>

<section>
    <header>
        <h2>Demo</h2>
    </header>
    <aside>
        <h3>Problem definition</h3>
        <p>Enter a problem definition in the <a href="http://lim.univ-reunion.fr/staff/fred/Enseignement/Optim/doc/CPLEX-LP/CPLEX-LP-file-format.html">LP Format</a></p>
        <p>
            <textarea id="lp_problem" style="min-height: 400px; width: 95%;">
                Maximize obj: x1 + 2 x2 + 3 x3 + x4 Subject To c1: - x1 + x2 + x3 + 10 x4 <= 20 c2: x1 - 3 x2 + x3 <= 30 c3: x2 - 3.5 x4 = 0 Bounds 0 <= x1 <= 40 2 <= x4 <= 3 End
            </textarea>
        </p>
    </aside>
    <aside>
        <h3>Solution</h3>
        <code id="solution" style="white-space: pre-wrap; width: 100%">Downloading highs-js...</code>
    </aside>
</section>
