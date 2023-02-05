<script lang="ts">
    import {solveGraph} from '$lib/graph/solve.ts'

    //import graphData from '$lib/data/test_data.json'
    import graphData from '$lib/data/tutorial.json'

    console.log('sdgbf')
    let content = solveGraph(graphData)
    console.log('sdgbf2')
</script>

<pre>{content}</pre>
