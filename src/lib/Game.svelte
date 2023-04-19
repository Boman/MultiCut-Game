<script lang="ts">
    import _ from 'lodash'
    import {onMount} from 'svelte'

    import graphData from '$lib/assets/campaign/00_tutorial.json'
    import Graph from '$lib/graph/Graph.svelte'
    import {solveGraph} from '$lib/graph/solve.ts'
    import {clientX, clientY, optimalScore, loadedGraph, mousePos, score} from '$lib/store'
    import LoadingScreen from '$lib/ui/LoadingScreen.svelte'
    import UI from '$lib/ui/UI.svelte'
    import {finishSound} from '$lib/sounds'

    let interfaceLoaded = false
    let showMenu: boolean
    let showWinScreen = false
    let graph
    let solution = {}
    let tutorialText
    let startTime
    let endTime

    $: $loadedGraph, reset()
    $: $optimalScore = solution.objectiveValue || -1

    $: showLoadingScreen = Boolean(!$loadedGraph)

    $: if ($optimalScore == $score) {
        endTime = Date.now()
        showWinScreen = true
        showMenu = true
        finishSound.play()
    }

    function restart() {
        $loadedGraph = $loadedGraph
        reset()
    }

    function reset() {
        console.log('reset')
        showWinScreen = false
        solution = {}
        startTime = Date.now()
        if ($loadedGraph != null) {
            ;(async () => {
                solution = await solveGraph($loadedGraph)
            })()
        }
    }

    function handleMousemove(e) {
        $mousePos = {x: e.clientX, y: e.clientY}
    }

    onMount(async () => {
        loadedGraph.set(graphData)
    })
</script>

<svelte:window on:mousemove={handleMousemove} bind:innerWidth={$clientX} bind:innerHeight={$clientY} />

<UI {graph} {restart} {startTime} {endTime} {showWinScreen} bind:interfaceLoaded bind:showMenu bind:tutorialText />

{#if $loadedGraph && interfaceLoaded}
    <Graph bind:this={graph} {showWinScreen} bind:tutorialText />
{/if}

{#if showLoadingScreen}
    <LoadingScreen />
{/if}
