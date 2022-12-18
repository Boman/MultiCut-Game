<script lang="ts">
  import { onMount } from "svelte";
  let pyodide: any;
  let graph_utils: any;
  let content: string = "";
  onMount(async () => {
    //@ts-ignore
    pyodide = await loadPyodide();
    await pyodide.loadPackage("networkx");
    await pyodide.loadPackage("numpy");
    await pyodide.runPython("print(1 + 2)");
    await pyodide.runPythonAsync(`
      from pyodide.http import pyfetch
      response = await pyfetch("/pyodide/graph_utils.py")
      with open("graph_utils.py", "wb") as f:
        f.write(await response.bytes())`);
    graph_utils = pyodide.pyimport("graph_utils");
    content = graph_utils.createGridGraph(3).edges;
    graph_utils.main();
  });
</script>

<main>
  <pre>{content}</pre>
</main>
