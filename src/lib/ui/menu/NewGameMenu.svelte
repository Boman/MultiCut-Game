<script lang="ts">
    import _ from 'lodash'
    import {fade} from 'svelte/transition'

    import tagsGroup from '$lib/assets/data/tags.json'
    import {maps, loadedGraph} from '$lib/store'
    import {getFeaturesFromTags} from '$lib/utils'
    import {randomGraph} from '$lib/graph/graph'

    export let newGame
    export let toggleMenu

    let nodes = 10
    let links = 0.2

    let mapId = 0
    let tags = []

    function loadTags() {
        const group = tagsGroup[maps[mapId].name]
        tags = _(group)
            .omit(['meta'])
            .map(g => Object.values(g))
            .flatten()
            .uniq()
            .sort()
            .map(tag => ({name: tag, checked: group.meta.defaults.includes(tag)}))
            .value()
    }

    loadTags()

    $: map = maps[mapId]
    $: selectedTags = _(tags)
        .filter(tag => tag.checked)
        .map(tag => tag.name)
        .value()
    $: unselected = _(tags)
        .filter(tag => !tag.checked)
        .map(tag => tag.name)
        .value()

    $: disabled = selectedTags.length === 0
</script>

<div class="flex flex-col">
    <div class="flex flex-col mb-4 min-h-[300px] justify-between">
        <!--
        <div class="flex flex-wrap">
            {#each tags as tag}
                <input id={tag.name} type="checkbox" hidden bind:checked={tag.checked} />
            {/each}
            {#each unselected as tag}
                <div class="flex justify-center mb-2 mr-2">
                    <label
                        for={tag}
                        type="checkbox"
                        class="px-3 py-1 text-sm font-semibold uppercase transition-all border-2 rounded-full cursor-pointer whitespace-nowrap text-background bg-foreground hover:border-background last:mr-0 border-foreground"
                    >
                        {tag}
                    </label>
                </div>
            {/each}
        </div>
-->

        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nodes: {nodes}</label>
        <input id="steps-range" type="range" min="2" max="30" bind:value={nodes} step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link sparseness: {links}</label>
        <input id="steps-range" type="range" min="0" max="1" bind:value={links} step="0.05" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

        <!--
        <div>
            {#if selectedTags.length > 0}
                <div in:fade={{duration: 200}} class="flex flex-wrap p-2 rounded-md bg-foreground">
                    {#each selectedTags as tag}
                        <div class="flex justify-center my-1 mr-2">
                            <label
                                for={tag}
                                type="checkbox"
                                class="px-3 py-1 text-sm font-semibold uppercase transition-all border-2 rounded-full cursor-pointer whitespace-nowrap text-background bg-foreground-light hover:border-background last:mr-0 border-foreground"
                            >
                                {tag}
                            </label>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    -->
    </div>
    <button
        on:click={async () => {
            console.log(nodes + ', ' + links)
            loadedGraph.set(randomGraph(nodes, links))
            toggleMenu()
        }}
        {disabled}
        class="p-2 mb-2 text-xl font-bold transition-colors rounded-md disabled:hover:bg-foreground disabled:opacity-10 disabled:hover:text-black disabled:cursor-not-allowed bg-foreground-light text-background hover:bg-green outline outline-4 transition-opacity"
    >
        START
    </button>
</div>
