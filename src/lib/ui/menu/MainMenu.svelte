<script lang="ts">
    import IconInfo from '$lib/icons/IconInfo.svelte'
    import IconLock from '$lib/icons/IconLock.svelte'
    import IconVolumeOff from '$lib/icons/IconVolumeOff.svelte'
    import IconVolumeUp from '$lib/icons/IconVolumeUp.svelte'
    import {day, save, soundEffects, timeLeft, loadedGraph} from '$lib/store'
    import AboutMenu from '$lib/ui/menu/AboutMenu.svelte'
    import CampaignMenu from '$lib/ui/menu/CampaignMenu.svelte'
    import NewRandomMenu from '$lib/ui/menu/NewRandomMenu.svelte'
    import NewLadderMenu from '$lib/ui/menu/NewLadderMenu.svelte'
    import WinScreen from '$lib/ui/menu/WinScreen.svelte'

    export let restart
    export let toggleMenu
    export let showWinScreen
    export let canRestart
    export let setActiveMenu
</script>

{#if showWinScreen}
    <WinScreen {...$$restProps} />
{/if}

<div class="flex flex-col">
    <button
        on:click={() => {
            setActiveMenu(CampaignMenu)
        }}
        class="p-2 mb-2 text-xl text-black transition-colors rounded-md bg-foreground-light hover:bg-background hover:text-foreground"
    >
        Campaign
    </button>
    <button
        on:click={() => {
            setActiveMenu(NewRandomMenu)
        }}
        class="p-2 mb-2 text-xl text-black transition-colors rounded-md bg-foreground-light hover:bg-background hover:text-foreground"
    >
        Random Level
    </button>
    <button
        on:click={() => {
            setActiveMenu(NewLadderMenu)
        }}
        class="p-2 mb-2 text-xl text-black transition-colors rounded-md bg-foreground-light hover:bg-background hover:text-foreground"
    >
        Möbius Ladder
    </button>
    <button
        on:click={() => {
            restart()
            toggleMenu()
        }}
        disabled={!canRestart}
        class="p-2 mb-2 text-xl text-black transition-colors rounded-md bg-foreground-light hover:bg-background hover:text-foreground disabled:opacity-30 disabled:hover:bg-foreground disabled:hover:text-background"
    >
        RESTART
    </button>
    <div class="flex items-center justify-between mt-3">
        <button on:click={() => setActiveMenu(AboutMenu)} class="p-2 transition-colors rounded-full cursor-pointer bg-foreground-light text-background hover:bg-background hover:text-foreground">
            <IconInfo />
        </button>
        <div class="flex justify-end ml-4">
            <input hidden id="Effects" type="checkbox" bind:checked={$soundEffects} />
            <label for="Effects" class="p-2 transition-colors rounded-full cursor-pointer bg-foreground-light text-background hover:bg-background hover:text-foreground">
                {#if $soundEffects}<IconVolumeUp />{:else}<IconVolumeOff />{/if}
            </label>
        </div>
    </div>
</div>
