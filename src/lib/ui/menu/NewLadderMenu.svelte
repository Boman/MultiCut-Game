<script lang="ts">
    import _ from 'lodash'
    import {fade} from 'svelte/transition'

    import {loadedGraph} from '$lib/store'
    import {ladderGraph} from '$lib/graph/graph'

    export let newGame
    export let toggleMenu

    let steps = 10
</script>

<div class="flex flex-col">
    <div class="flex flex-col mb-4 justify-between">
        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Steps: {steps}</label>
        <input id="steps-range" type="range" min="2" max="30" bind:value={steps} step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
    </div>
    <button
        on:click={async () => {
            loadedGraph.set(ladderGraph(steps))
            toggleMenu()
        }}
        class="p-2 mb-2 text-xl font-bold transition-colors rounded-md disabled:hover:bg-foreground disabled:opacity-10 disabled:hover:text-black disabled:cursor-not-allowed bg-foreground-light text-background hover:bg-green outline outline-4 transition-opacity"
    >
        START
    </button>
</div>
