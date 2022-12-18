<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { ForceGraph } from "$lib/ForceGraph";
  //import miserables from "$lib/data/test_data.json";
  import miserables from "$lib/data/l5.json";

  let vis: HTMLDivElement; // binding with div for visualization
  let svgElement;

  onMount(() => {
    //d3.select(vis).html(null);

    let width = 1400; // outer width, in pixels
    let height = 700; // outer height, in pixels

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    //d3.select(vis).append(() => svg.node());

    console.log(d3.select(vis), svg, d3.select(svgElement))

    ForceGraph(miserables, {
      nodeId: (d) => d.id,
      nodeTitle: (d) => `${d.id}\n${d.group}`,
      linkStrokeWidth: (l) => 3 * Math.sqrt(Math.abs(l.value)),
      linkStroke: (l) => (l.value > 0 ? "green" : "red"),
      nodeRadius: 25,
      svg: d3.select(svgElement),
    });
  });
</script>

<main>
  <div id="vis" bind:this={vis}>
    <svg id="svgElement" bind:this={svgElement} width=1400 height=700 viewBox="-700 -350 1400 700" style="max-width: 100%; height: auto; height: intrinsic;"/>
  </div>
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
