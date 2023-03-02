<script lang="ts">
    import _ from 'lodash'
    import {onMount} from 'svelte'

    import graphData from '$lib/assets/campaign/00_tutorial.json'
    //import graphData from '$lib/assets/campaign/04_l15.json'
    import Graph from '$lib/graph/Graph.svelte'
    import {solveGraph} from '$lib/graph/solve.ts'
    import {clientX, clientY, optimalScore, loadedGraph, mousePos} from '$lib/store'
    import LoadingScreen from '$lib/ui/LoadingScreen.svelte'
    import UI from '$lib/ui/UI.svelte'

    let interfaceLoaded = false
    let showMenu: boolean
    let showWinScreen = false
    let ui
    let graph
    let gameConfiguration = {
        mode: 'dailyQuest',
        randomize: false,
        possibleCountries: 'all',
        restart: false,
        maxGuesses: 5
    }
    let solution = {}

    $: $loadedGraph, $optimalScore = -1
    $: (async () => {
        if ($loadedGraph != null) {
            solution = await solveGraph($loadedGraph)
        }
    })()
    $: $optimalScore = solution.objectiveValue || -1
    $: console.log('solution: ' + JSON.stringify(solution))

    $: showLoadingScreen = Boolean(!$loadedGraph)
    $: canRestart = true//gameConfiguration.restart ?? true

    function restart() {
        showWinScreen = false
        $loadedGraph = $loadedGraph
    }

    function newGame(configuration) {
        gameConfiguration = configuration

        if (configuration?.restart ?? true) restart()
    }

    function handleMousemove(e) {
        $mousePos = {x: e.clientX, y: e.clientY}
    }

    onMount(async () => {
        loadedGraph.set(graphData)
    })
</script>

<svelte:window on:mousemove={handleMousemove} bind:innerWidth={$clientX} bind:innerHeight={$clientY} />

<UI bind:this={ui} {graph} {restart} {newGame} {showWinScreen} {canRestart} {gameConfiguration} bind:interfaceLoaded bind:showMenu />

{#if $loadedGraph && interfaceLoaded}
    <Graph bind:this={graph} />
{/if}

{#if showLoadingScreen}
    <LoadingScreen />
{/if}
