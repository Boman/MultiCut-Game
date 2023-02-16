<script lang="ts">
    import _ from 'lodash'
    import {onMount} from 'svelte'

    //import graphData from '$lib/data/l5.json'
    import graphData from '$lib/data/tutorial.json'
    import Graph from '$lib/graph/Graph.svelte'
    import {clientX, clientY, day, loadedGraph, mousePos, save, showDebug} from '$lib/store'
    import LoadingScreen from '$lib/ui/LoadingScreen.svelte'
    import UI from '$lib/ui/UI.svelte'

    import dailyQuestCountries from '$lib/assets/data/daily-quest.json'

    let questionFeature
    let lastFocusedCountry
    let foundFeatures = []
    let unfoundFeatures = []
    let toFind = []
    let originalToFind = []
    let correctCountries = []
    let streak = 0
    let mistakes = 0
    let mistakesThisGuess = 0
    let interfaceLoaded = false
    let showMenu: boolean
    let showWinScreen = false
    let ui
    let graph
    let gameConfiguration = {
        mode: 'dailyQuest',
        countries: dailyQuestCountries[$day % 999],
        randomize: false,
        possibleCountries: 'all',
        restart: false,
        maxGuesses: 5
    }

    $: showLoadingScreen = Boolean(!$loadedGraph)
    $: correct = correctCountries.length
    $: canRestart = gameConfiguration.restart ?? true

    function pickFeature() {
        const possibilities = _(toFind).filter(feature => feature !== questionFeature)
        questionFeature = gameConfiguration.randomize ?? true ? possibilities.sample() : possibilities.value()[0]
    }

    function restart() {
        showWinScreen = false
        mistakes = 0
        mistakesThisGuess = 0
        streak = 0
        toFind = originalToFind
        foundFeatures = []
        correctCountries = []

        questionFeature = undefined
        pickFeature()
    }

    function newGame(configuration) {
        gameConfiguration = configuration

        if (configuration?.restart ?? true) restart()

        if (configuration?.mode === 'dailyQuest') {
            const progress = $save.dailyQuestProgress.progress
        }
    }

    function newDailyQuest() {
        if ($save?.dailyQuestProgress?.day !== $day) $save.dailyQuestProgress = {...$save.dailyQuestProgress, progress: [], day: $day}

        newGame({
            mode: 'dailyQuest',
            randomize: false,
            restart: false,
            maxGuesses: 5
        })
    }

    function handleMousemove(e) {
        $mousePos = {x: e.clientX, y: e.clientY}
    }

    onMount(async () => {
        loadedGraph.set(graphData)
        //await loadMap(maps[0])
        newDailyQuest()
    })
</script>

<svelte:window on:mousemove={handleMousemove} bind:innerWidth={$clientX} bind:innerHeight={$clientY} />

<UI
    bind:this={ui}
    {mistakes}
    {correct}
    {restart}
    {newGame}
    {showWinScreen}
    {graph}
    {streak}
    {newDailyQuest}
    {canRestart}
    {gameConfiguration}
    bind:interfaceLoaded
    bind:showMenu
/>

{#if $loadedGraph && interfaceLoaded}
    <Graph bind:this={graph} />
{/if}

{#if showLoadingScreen}
    <LoadingScreen />
{/if}
