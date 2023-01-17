<script lang="ts">
    import * as d3 from 'd3'
    import _ from 'lodash'
    import {onMount} from 'svelte'
    import {fly} from 'svelte/transition'

    import {clientX, clientY, mousePos, loadedGraph, score} from '$lib/store'

    import {ForceGraph} from '$lib/graph/ForceGraph.ts'

    let transform = d3.zoomIdentity
    let svg
    let content
    let d3Svg
    let fg

    function zoomed(e) {
        const t = e.transform
        t.x = Math.min($clientX / 2, Math.max(t.x, $clientX / 2 - $clientX * t.k))
        t.y = Math.min($clientY / 2, Math.max(t.y, $clientY / 2 - $clientY * t.k))
        transform = t
        if (e.sourceEvent) $mousePos = {x: e.sourceEvent.clientX, y: e.sourceEvent.clientY}
    }

    let zoom = d3.zoom().scaleExtent([1, 50]).on('zoom', zoomed).clickDistance(10)

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
        })
    })
</script>

<svelte:window />

<svg bind:this={svg} transition:fly={{y: 20, duration: 1500}} width={$clientX} height={$clientY} viewBox="{-$clientX / 2} {-$clientY / 2} {$clientX} {$clientY}">
    <g bind:this={content} shape-rendering="auto" />
</svg>
