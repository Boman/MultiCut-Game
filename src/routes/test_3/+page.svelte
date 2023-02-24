<script lang="ts">
    import {solveGraph} from '$lib/graph/solve.ts'

    import graphData from '$lib/data/l15.json'
    //import graphData from '$lib/data/tutorial.json'

    let content = 'solving ...'
    solveGraph(graphData).then(r => (content = JSON.stringify(r)))
</script>

<div>
    {content}
</div>
