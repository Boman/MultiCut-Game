<script lang="ts">
    import _ from 'lodash'
    import {onMount} from 'svelte'

    import graphData from '$lib/assets/campaign/00_tutorial.json'
    import Graph from '$lib/graph/Graph.svelte'
    import {solveGraph} from '$lib/graph/solve.ts'
    import {clientX, clientY, optimalScore, loadedGraph, mousePos, score} from '$lib/store'
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
    let tutorialText
    let startTime
    let endTime

    $: $loadedGraph, reset()
    $: (async () => {
        if ($loadedGraph != null) {
            solution = await solveGraph($loadedGraph)
        }
    })()
    $: $optimalScore = solution.objectiveValue || -1

    $: showLoadingScreen = Boolean(!$loadedGraph)
    $: canRestart = true //gameConfiguration.restart ?? true

    $: if ($optimalScore == $score) {
        endTime = Date.now()
        showWinScreen = true
        showMenu = true
    }

    function restart() {
        $loadedGraph = $loadedGraph
        reset()
    }

    function reset() {
        console.log('reset')
        showWinScreen = false
        $optimalScore = solution.objectiveValue || -1
        startTime = Date.now()
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

<UI bind:this={ui} {graph} {restart} {newGame} {startTime} {endTime} {showWinScreen} {canRestart} {gameConfiguration} bind:interfaceLoaded bind:showMenu bind:tutorialText />

{#if $loadedGraph && interfaceLoaded}
    <Graph bind:this={graph} {showWinScreen} bind:tutorialText />
{/if}

{#if showLoadingScreen}
    <LoadingScreen />
{/if}
