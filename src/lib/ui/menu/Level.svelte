<script lang="ts">
    import IconTrophy from '$lib/icons/IconTrophy.svelte'
    import {loadedGraph} from '$lib/store'

    export let level
    export let toggleMenu

    let finished = false
</script>

<div class="flex items-center mb-2 last:mb-0 bg-foreground-light rounded-md p-2">
    <button
        on:click={async () => {
            loadedGraph.set(level)
            toggleMenu()
        }}
        class="p-2 mb-2 text-xl text-black transition-colors rounded-md bg-foreground-light hover:bg-background hover:text-foreground"
    >
        {#if finished}
            <div class="mr-2">
                <IconTrophy />
            </div>
        {/if}
        <div>
            <h1 class="font-black">
                {level.name}
            </h1>
            {#if 'description' in level}
                <p>{level.description}</p>
            {/if}
        </div>
    </button>
</div>
