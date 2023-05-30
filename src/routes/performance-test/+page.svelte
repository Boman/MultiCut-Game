<script lang="ts">
    import {randomGraph} from '$lib/graph/graph'
    import {solveGraph} from '$lib/graph/solve.ts'
    import {browser} from '$app/environment'

    $: if (browser) document.body.classList.toggle('overflow-hidden', false)

    const delay = ms => new Promise(res => setTimeout(res, ms))
    const iterations = 100

    let nodes = 10
    let links = 0.1 //0.2
    let content = ''
    ;(async () => {
        //return
        await delay(5000)
        for (links = 0.1; links <= 1; links += 0.1) {
            for (nodes = 5; nodes <= 1000; nodes += nodes < 50 ? 5 : 10) {
                content += 'nodes: ' + nodes + ', links: ' + links + ', '
                let times = []
                let steps = []
                console.log('nodes: ' + nodes + ', links: ' + links)
                for (let i = 0; i < iterations; i++) {
                    let graph = randomGraph(nodes, links)
                    let solution = await solveGraph(graph)
                    console.log('solveTime: ' + solution.solveTime + ', solvingSteps: ' + solution.solvingSteps)
                    times.push(solution.solveTime / 1000)
                    steps.push(solution.solvingSteps)
                }
                content += 'times: ' + minMaxMeanStd(times).join(', ') + ', '
                content += 'steps: ' + minMaxMeanStd(steps).join(', ') + '\n'

                if (minMaxMeanStd(times)[2] > 30) {
                    break
                }
            }
        }
    })()

    function minMaxMeanStd(array) {
        array.sort()
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        const std = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
        return [array[0], array[array.length - 1], mean, std]
    }
</script>

<main>
    <div>
        <pre>{content}</pre>
    </div>
</main>
