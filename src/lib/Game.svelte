<script lang="ts">
    import {polyfillCountryFlagEmojis} from 'country-flag-emoji-polyfill'
    import _ from 'lodash'
    import {onMount} from 'svelte'

    //import graphData from '$lib/data/test_data.json'
    import graphData from '$lib/data/l5.json'
    import {loadMap} from '$lib/map'
    import Graph from '$lib/graph/Graph.svelte'
    import {clientX, clientY, day, geojson, geometries, loadedGraph, loadedMap, maps, mousePos, save, showDebug} from '$lib/store'
    import DebugInterface from '$lib/ui/DebugInterface.svelte'
    import LoadingScreen from '$lib/ui/LoadingScreen.svelte'
    import UI from '$lib/ui/UI.svelte'
    import {achieveAchievement, ALREADY_GUESSED, CORRECT, getGeojsonByName, processWorldAchievements, shuffleColors, WRONG} from '$lib/utils'

    polyfillCountryFlagEmojis()
    import dailyQuestCountries from '$lib/assets/data/daily-quest.json'

    const dev = import.meta.env.DEV

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

    $: showLoadingScreen = Boolean(!$loadedMap)
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

        if (gameConfiguration.possibleCountries === 'all') unfoundFeatures = $geometries
        else unfoundFeatures = toFind

        questionFeature = undefined
        shuffleColors()
        pickFeature()
    }

    function newGame(configuration) {
        gameConfiguration = configuration
        toFind = _($geometries)
            .filter(geometry => configuration.countries.includes(geometry.properties.name))
            .sortBy(g => _(configuration.countries).findIndex(c => c === g.properties.name))
            .value()
        originalToFind = toFind

        if (configuration?.restart ?? true) restart()

        if (configuration?.mode === 'dailyQuest') {
            const progress = $save.dailyQuestProgress.progress

            if (gameConfiguration.possibleCountries === 'all') unfoundFeatures = $geometries
            else unfoundFeatures = toFind

            const alreadyFound = _(progress)
                .filter(arr => configuration.countries.includes(arr.slice(-1)[0]))
                .map(arr => arr.slice(-1)[0])
                .value()

            foundFeatures = alreadyFound
            correctCountries = _(progress)
                .filter(arr => arr.length === 1)
                .map(arr => arr[0])
                .value()

            mistakes = _(progress)
                .flatten()
                .reject(c => configuration.countries.includes(c))
                .value().length

            if (alreadyFound.length === progress.length) mistakesThisGuess = 0
            else mistakesThisGuess = _(progress.slice(-1)[0]).difference(configuration.countries).value().length

            if (mistakesThisGuess > 0) streak = 0
            else {
                const i = _(progress)
                    .map(arr => arr.length)
                    .reverse()
                    .findIndex(c => c !== 1)
                if (i === -1) streak = progress.length
                else streak = i
            }

            toFind = _($geometries)
                .filter(geometry =>
                    _(configuration.countries)
                        .reject(c => alreadyFound.includes(c))
                        .value()
                        .includes(geometry.properties.name)
                )
                .sortBy(g => _(configuration.countries).findIndex(c => c === g.properties.name))
                .value()

            if (toFind.length !== 0) {
                questionFeature = undefined
                pickFeature()
            } else {
                unfoundFeatures = []
                showMenu = true
                showWinScreen = true
            }
        }
    }

    function newDailyQuest() {
        if ($save?.dailyQuestProgress?.day !== $day) $save.dailyQuestProgress = {...$save.dailyQuestProgress, progress: [], day: $day}

        newGame({
            mode: 'dailyQuest',
            countries: dailyQuestCountries[$day % 999],
            randomize: false,
            possibleCountries: 'all',
            restart: false,
            maxGuesses: 5
        })
    }

    function handleMousemove(e) {
        $mousePos = {x: e.clientX, y: e.clientY}
    }

    function handleKeypress(e) {
        if (dev && e.key === 'd') $showDebug = !$showDebug
    }

    onMount(async () => {
        loadedGraph.set(graphData)
        await loadMap(maps[0])
        newDailyQuest()
    })
</script>

<svelte:window on:keypress={handleKeypress} on:mousemove={handleMousemove} bind:innerWidth={$clientX} bind:innerHeight={$clientY} />

{#if dev}
    <DebugInterface {mistakesThisGuess} {toFind} {unfoundFeatures} {lastFocusedCountry} />
{/if}

<UI
    bind:this={ui}
    {questionFeature}
    {foundFeatures}
    {originalToFind}
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

{#if $loadedMap && interfaceLoaded}
    <Graph bind:this={graph} />
{/if}

{#if showLoadingScreen}
    <LoadingScreen />
{/if}
