<script lang="ts">
    import * as d3 from 'd3'
    import _ from 'lodash'
    import {onMount} from 'svelte'
    import {fly} from 'svelte/transition'

    import {clientX, clientY, mousePos, loadedGraph, score} from '$lib/store'

    import {ForceGraph} from '$lib/graph/ForceGraph.ts'

    import IconArrowHeadRight from '$lib/icons/IconArrowHeadRight.svelte'

    let transform = d3.zoomIdentity
    let svg
    let content
    let d3Svg
    let fg
    export let tutorialText = ''

    function zoomed(e) {
        const t = e.transform
        t.x = Math.min(($clientX * t.k) / 2, Math.max(t.x, (-$clientX * t.k) / 2))
        t.y = Math.min(($clientY * t.k) / 2, Math.max(t.y, (-$clientY * t.k) / 2))
        transform = t
        if (e.sourceEvent) $mousePos = {x: e.sourceEvent.clientX, y: e.sourceEvent.clientY}
    }

    let zoom = d3.zoom().scaleExtent([0.5, 4]).on('zoom', zoomed).clickDistance(10)

    export function zoomIn() {
        zoom.scaleBy(d3Svg.transition().duration(200), 1.8)
    }

    export function zoomOut() {
        zoom.scaleBy(d3Svg.transition().duration(200), 1 / 1.8)
    }

    onMount(async () => {
        d3Svg = d3.select(svg)
        d3Svg.call(zoom)

        loadedGraph.subscribe(graph => {
            d3.select(content).selectAll('*').remove()
            d3.select(content).html(null)
            if (fg) {
                fg.stop()
            }
            fg = ForceGraph(graph, {
                nodeId: d => d.id,
                nodeTitle: d => `${d.id}\n${d.group}`,
                linkStrokeWidth: l => 3 * Math.sqrt(Math.abs(l.value)),
                width: $clientX,
                height: $clientY,
                svg: d3.select(content),
                score: s => ($score = s)
            })
            if (graph.name == 'Tutorial') {
                tutorialText = 'Your mission is to collect as many points as possible by connecting green lines while keeping the red lines disconnected. First select the highlighted node.'
                fg.glowNode([1])
                fg.restrictActions([{action: 'select', aNode: 1}])
                fg.addRestrictionCheckedHandler(restriction => {
                    if (_.isEqual(restriction, {action: 'select', aNode: 1})) {
                        tutorialText =
                            "Nice! We see different numbers on the lines. These are the points you can collect. Let's connect the green line denoted with 9 points. Simply drag the currently selected node to the highlighted node."
                        fg.glowNode([0])
                        fg.restrictActions([{action: 'brush', aNode: 0}])
                        fg.addRestrictionCheckedHandler(restriction => {
                            if (_.isEqual(restriction, {action: 'brush', aNode: 0})) {
                                tutorialText = 'Wonderful! You collected 9 points. Now lets also connect a second highlighted node.'
                                fg.glowNode([3])
                                fg.restrictActions([{action: 'brush', aNode: 3}])
                                fg.addRestrictionCheckedHandler(restriction => {
                                    if (_.isEqual(restriction, {action: 'brush', aNode: 3})) {
                                        tutorialText =
                                            'Great! Oh wait - we actually decreased our score, since now also the red line denoted with -8 points is connected. We have do detach the last node. Simply double click the highlighted node.'
                                        fg.glowNode([3])
                                        fg.restrictActions([{action: 'detach', aNode: 3}])
                                        fg.addRestrictionCheckedHandler(restriction => {
                                            if (_.isEqual(restriction, {action: 'detach', aNode: 3})) {
                                                tutorialText = 'Supreme! Now there is only one last line to connect to solve the multicut. Select a highlighted node.'
                                                fg.glowNode([2, 4])
                                                fg.restrictActions([
                                                    {action: 'select', aNode: 2},
                                                    {action: 'select', aNode: 4}
                                                ])
                                                fg.addRestrictionCheckedHandler(restriction => {
                                                    if (_.isEqual(restriction, {action: 'select', aNode: 2}) || _.isEqual(restriction, {action: 'select', aNode: 4})) {
                                                        let nextNode = restriction.aNode == 4 ? 2 : 4
                                                        tutorialText = 'Now connect the highlighted node..'
                                                        fg.glowNode([nextNode])
                                                        fg.restrictActions([{action: 'brush', aNode: nextNode}])
                                                        fg.addRestrictionCheckedHandler(restriction => {
                                                            if (_.isEqual(restriction, {action: 'detach', aNode: nextNode})) {
                                                                tutorialText = undefined
                                                                fg.glowNode([])
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                tutorialText = undefined
            }
        })
    })
</script>

<svelte:window />

<svg bind:this={svg} transition:fly={{y: 20, duration: 1500}} width={$clientX} height={$clientY} viewBox="{-$clientX / 2} {-$clientY / 2} {$clientX} {$clientY}">
    <defs>
        <radialGradient id="g">
            <stop stop-color="#fff999" offset="0.8" />
            <stop stop-color="#fff999" offset="1" stop-opacity="0.0" />
        </radialGradient>
        <filter id="sofGlow" width="100%" height="100%" x="-100%" y="-100%">
            <!-- Use a gaussian blur to create the soft blurriness of the glow -->
            <feGaussianBlur in="thicken" stdDeviation="5" result="blurred" />
        </filter>
    </defs>
    <g bind:this={content} shape-rendering="auto" {transform} />
</svg>
