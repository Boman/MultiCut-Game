<script lang="ts">
    import {onMount} from 'svelte'
    import {fly} from 'svelte/transition'

    import IconCheckmark from '$lib/icons/IconCheckmark.svelte'
    import IconFullScreen from '$lib/icons/IconFullScreen.svelte'
    import IconMenu from '$lib/icons/IconMenu.svelte'
    import Menu from '$lib/ui/menu/Menu.svelte'
    import Notifications from '$lib/ui/Notifications.svelte'
    import {score, optimalScore, loadedGraph} from '$lib/store'

    export let restart
    export let showMenu = false
    export let interfaceLoaded = false
    export let showWinScreen
    export let graph

    function toggleFullScreen() {
        const html = document.querySelector('#svelte')
        if (!document.fullscreenElement && html.requestFullscreen) html.requestFullscreen()
        else if (document.exitFullscreen) document.exitFullscreen()
    }

    function toggleMenu() {
        showMenu = !showMenu
    }

    onMount(async () => {
        window.setTimeout(() => (interfaceLoaded = true), 200)
    })
</script>

<div class="container relative">
    {#if $loadedGraph}
        <div transition:fly={{y: -100, duration: 500}} class="container absolute z-30 flex flex-col items-center justify-center mt-4 pointer-events-none">
            <div class="flex">
                <div class="flex py-2 rounded-md shadow-md pointer-events-auto bg-foreground-light text-gray">
                    <span class="mx-5 whitespace-nowrap font-medium">{$score}</span>
                    <span class="flex items-center justify-center mx-2">
                        <IconCheckmark />
                        <span class="ml-1">
                            {#if $optimalScore > -1}
                                {Math.floor(($score * 100) / $optimalScore)} %
                            {:else}
                                computing solution...
                            {/if}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    {/if}
    <div class="container absolute z-40 items-start justify-between hidden mt-4 pointer-events-none md:flex">
        <div class="flex flex-col font-black rounded-md shadow-md pointer-events-auto text-md text-background bg-foreground mx-4">
            <button on:click={() => graph.zoomIn()} class="flex items-center justify-center w-10 h-10 transition-all duration-75 rounded-md hover:text-xl hover:bg-foreground-light">+</button>
            <button on:click={() => graph.zoomOut()} class="flex items-center justify-center w-10 h-10 transition-all duration-75 rounded-md hover:text-xl hover:bg-foreground-light">-</button>
        </div>
        <div class="flex">
            <button on:click={toggleMenu} class="flex p-2 transition rounded-md shadow-md pointer-events-auto text-background bg-foreground hover:bg-foreground-light mx-4">
                <IconMenu /><span class="ml-2">Menu</span>
            </button>
            <!--
            <button on:click={toggleFullScreen} class="mx-4 transition-transform pointer-events-auto hover:scale-110 text-foreground hover:text-foreground-light">
                <IconFullScreen />
            </button>
            -->
        </div>
    </div>
</div>

<div class="absolute bottom-0 left-0 flex flex-col m-6 font-black rounded-md shadow-md pointer-events-auto md:hidden text-md text-background bg-foreground">
    <button on:click={() => graph.zoomIn()} class="flex items-center justify-center w-10 h-10 transition-all duration-75 rounded-md hover:text-xl hover:bg-foreground-light">+</button>
    <button on:click={() => graph.zoomOut()} class="flex items-center justify-center w-10 h-10 transition-all duration-75 rounded-md hover:text-xl hover:bg-foreground-light">-</button>
</div>
<div class="absolute bottom-0 right-0 m-6 md:hidden">
    <button class="z-40 flex p-4 transition rounded-full shadow-md pointer-events-auto text-background bg-foreground hover:bg-foreground-light" on:click={toggleMenu}>
        <IconMenu />
    </button>
</div>

{#if showMenu}
    <Menu {showWinScreen} {toggleMenu} {restart} {...$$props} />
{/if}

<Notifications />
