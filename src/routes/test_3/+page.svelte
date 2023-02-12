<script lang="ts">
    import {solveGraph} from '$lib/graph/solve.ts'

    import graphData from '$lib/data/l5.json'
    //import graphData from '$lib/data/tutorial.json'

    let content = solveGraph(graphData)
</script>

<div>
    <pre>{content}</pre>
</div>
