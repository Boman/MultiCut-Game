<script lang="ts">
    import _ from 'lodash'
    import {fly} from 'svelte/transition'

    import IconCheckmark from '$lib/icons/IconCheckmark.svelte'

    export let mistakes
    export let correct
    export let originalToFind
    export let gameConfiguration
    export let startTime
    export let endTime
</script>

<div class="flex flex-col justify-start p-4 mb-8 text-xl border-4 rounded-md shadow-md bg-background border-background-dark ring-4 ring-green">
    <div class="flex flex-row flex-1 w-full">
        <div class="flex flex-col flex-1 w-full">
            <span in:fly={{x: -10, delay: 800}} class="flex items-center justify-start text-green">
                <IconCheckmark />
                <span class="ml-1">Solved!</span>
                <span class="ml-1">It took {(endTime - startTime) / 1000} seconds to solve.</span>
            </span>
        </div>
    </div>
    <button class="flex group relative bg-background-dark text-foreground rounded mt-4 justify-center items-center p-2 font-bold">
        <span
            class="absolute hidden group-hover:flex -top-2 -translate-y-full rounded-lg text-center text-foreground text-base py-2 px-4 bg-background-dark justify-center after:content-[''] after:absolute  after:top-[100%] after:border-8 after:border-x-transparent after:border-b-transparent after:border-background-dark"
        >
            next
        </span>
    </button>
</div>
