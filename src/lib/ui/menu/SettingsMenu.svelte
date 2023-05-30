<script lang="ts">
    import IconVolumeOff from '$lib/icons/IconVolumeOff.svelte'
    import IconVolumeUp from '$lib/icons/IconVolumeUp.svelte'

    import {nodeColoringMode, keepForceLayout, soundEffects} from '$lib/store'
</script>

<div class="flex flex-col">
    <div class="flex flex-col mb-4 justify-between">
        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Node coloring mode:</label>
        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input type="radio" bind:group={$nodeColoringMode} name="nodeColoringMode" value={'brush'} id="radio01" />
            <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radio01"> Select brush for coloring nodes by dragging. </label>
        </div>
        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input type="radio" bind:group={$nodeColoringMode} name="nodeColoringMode" value={'select'} id="radio02" />
            <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radio02"> Select node for coloring by dragging. </label>
        </div>
        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input type="radio" bind:group={$nodeColoringMode} name="nodeColoringMode" value={'none'} id="radio03" />
            <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radio03"> Enable coloring nodes simply by dragging. </label>
        </div>
    </div>
    <div class="flex flex-col mb-4 justify-between">
        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keep force layout after dragging node:</label>
        <div class="flex ml-4">
            <input hidden id="Effects" type="checkbox" bind:checked={$soundEffects} />
            <label for="Effects" class="p-2 transition-colors rounded-full cursor-pointer bg-foreground-light text-background hover:bg-background hover:text-foreground">
                {#if $soundEffects}<IconVolumeUp />{:else}<IconVolumeOff />{/if}
            </label>
        </div>
    </div>
    <div class="flex flex-col mb-4 justify-between">
        <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sound:</label>
        <div class="flex ml-4">
            <input hidden id="Effects" type="checkbox" bind:checked={$soundEffects} />
            <label for="Effects" class="p-2 transition-colors rounded-full cursor-pointer bg-foreground-light text-background hover:bg-background hover:text-foreground">
                {#if $soundEffects}<IconVolumeUp />{:else}<IconVolumeOff />{/if}
            </label>
        </div>
    </div>
</div>
