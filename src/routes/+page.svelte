<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { ForceGraph } from "$lib/ForceGraph";
  import miserables from "$lib/data/test_data.json";

  let vis: HTMLDivElement; // binding with div for visualization

  onMount(() => {
    d3.select(vis).html(null);

    let chart = ForceGraph(miserables, {
      nodeId: (d) => d.id,
      nodeTitle: (d) => `${d.id}\n${d.group}`,
      linkStrokeWidth: (l) => 3 * Math.sqrt(Math.abs(l.value)),
      linkStroke: (l) => (l.value > 0 ? "green" : "red"),
      nodeRadius: 25,
      linkStrength: 0.01,
      nodeStrength: -200,
    });

    const svg = d3.select(vis).append(() => chart);
  });
</script>

<main>
  <div id="vis" bind:this={vis} />
</main>

<style>
  main {
    height: 100vh;
    display: flex;
  }

  #vis {
    width: 100%;
    height: 100vh;
    background-color: whitesmoke;
  }
</style>
