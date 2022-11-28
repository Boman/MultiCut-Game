import * as d3 from "d3";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
export function ForceGraph(
    {
        nodes, // an iterable of node objects (typically [{id}, …])
        links, // an iterable of link objects (typically [{source, target}, …])
    },
    {
        nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 1.5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 5, // node radius, in pixels
        nodeStrength,
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkValue = ({ value }) => value, // given d in links, returns a node identifier string
        linkStroke = "#999", // link stroke color
        linkStrokeOpacity = 0.6, // link stroke opacity
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        colors = d3.schemeDark2, // an array of color strings, for the node groups
        width = 1400, // outer width, in pixels
        height = 700, // outer height, in pixels
    } = {}
) {
    // Compute values.
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    const LV = d3.map(links, linkValue).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const G = Array.from(Array(nodes.length).keys());
    const W =
        typeof linkStrokeWidth !== "function"
            ? null
            : d3.map(links, linkStrokeWidth);
    const L =
        typeof linkStroke !== "function" ? null : d3.map(d3.map(links, linkStroke), d3.color);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i], value: LV[i] }));

    // Construct the scales.
    const color = d3.scaleOrdinal(G, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);
    if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter().strength(0.01))
        .on("tick", ticked);

    const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    var background = svg.append("rect")
        .attr("x", -width / 2)
        .attr("y", -height / 2)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "fill: whitesmoke;")
        .call(dragBackground(simulation))
        .on("click", function (d) { click(d, null); });

    const link = svg
        .append("g")
        .attr(
            "stroke",
            typeof linkStroke !== "function" ? linkStroke : null
        )
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr(
            "stroke-width",
            typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
        )
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("id", ({ index: i }) => "link_" + i);

    const node = svg
        .append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .call(drag(simulation))
        .on("click", click)
        .on("dblclick", dblclick);

    var link_label = svg.selectAll(".link_label")
        .data(links)
        .enter()
        .append("text")
        .attr("font-size", 32)
        .text(function (d, i) {
            return links[i].value;
        });

    var score_label = svg
        .append("text")
        .attr("font-size", 42)
        .attr("id", "score_label")
        .attr("x", -width / 2 + 10)
        .attr("y", height / 2 - 10)
        .text("Score: 0");

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);
    if (G) node.attr("fill", ({ index: i }) => color(G[i]));
    if (T) node.append("title").text(({ index: i }) => T[i]);

    calcScore();

    function intern(value) {
        return value !== null && typeof value === "object"
            ? value.valueOf()
            : value;
    }

    function ticked() {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        link_label.attr("x", function (d, i) {
            var line_node = d3.select("#link_" + i)
            return (parseInt(line_node.attr("x1")) + parseInt(line_node.attr("x2"))) / 2;
        })
            .attr("y", function (d, i) {
                var line_node = d3.select("#link_" + i)
                return (parseInt(line_node.attr("y1")) + parseInt(line_node.attr("y2"))) / 2;
            })
    }

    function dragBackground(simulation) {
        function dragstarted(event) {
        }

        function dragged(event) {
            let filteredNodes = nodes.filter(n => Math.sqrt(Math.pow(n.x - event.x, 2) + Math.pow(n.y - event.y, 2)) < nodeRadius);

            if (filteredNodes.length > 0 && clickedNode != -1) {
                filteredNodes.forEach(n => {
                    updateNodeCluster(nodes.indexOf(n), clickedNode);
                });
            }
        }

        function dragended(event) {
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function updateNodeCluster(newNode, clusterNode) {
        G[newNode] = G[clusterNode];
        greyOut();
        calcScore();
    }

    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;

            event.subject.beforeDragX = event.subject.x;
            event.subject.beforeDragY = event.subject.y;

            nodes.forEach(n => {
                n.fx = n.x;
                n.fy = n.y;
            });
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;

            nodes.forEach(n => {
                n.fx = null;
                n.fy = null;
            });

            // filter nodes which are in the radius of the drag end position
            let filteredNodes = nodes.filter(n => n != event.subject && Math.sqrt(Math.pow(n.x - event.x, 2) + Math.pow(n.y - event.y, 2)) < nodeRadius);
            if (G && filteredNodes.length == 1) {
                G[nodes.indexOf(event.subject)] = G[nodes.indexOf(filteredNodes[0])]
                node.attr("fill", ({ index: i }) => color(G[i]));
                if (event.subject.beforeDragX) {
                    event.subject.x = event.subject.beforeDragX;
                    event.subject.y = event.subject.beforeDragY;
                }
                calcScore()
            }
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    let clickedNode: number = -1

    function click(event, d) {
        let i: number = nodes.indexOf(d);
        clickedNode = i;
        greyOut();
    }

    function greyOut() {
        if (G) {
            node.attr("fill",
                ({ index: i }) => saturate(color(G[i]), clickedNode == i || clickedNode == -1 || G[clickedNode] == G[i] ? 1 : 0.32));
        }
        if (L) {
            link.attr("stroke",
                ({ index: i }) => saturate(L[i], clickedNode == -1 || G[nodes.indexOf(links[i].source)] == G[nodes.indexOf(links[i].target)] ? 1 : 0.32));
        }
    }

    function dblclick(event, d) {
        let i: number = nodes.indexOf(d);
        // if node is not a singleton
        if (G.filter(x => x == G[i]).length > 1) {
            // compute new color index for node to be excluded from color group
            let n = Array.from(Array(nodes.length).keys()).filter(x => !G.includes(x));
            if (n.length > 0) {
                G[i] = n[0];
                clickedNode = -1;
                greyOut();
                calcScore()
            }
        }
    }

    function calcScore() {
        let score = 0
        score = links.map(l => G[nodes.indexOf(l.source)] != G[nodes.indexOf(l.target)] ? 0 : l.value).reduce((a, b) => a + b)
        d3.select("#score_label").text("Score: " + score)

        link.attr("stroke-dasharray", function (d, i) {
            if (G[d.source.index] != G[d.target.index]) {
                return "10, 30"
            } else {
                return "10, 0"
            }
        })
    }

    function saturate(color, k = 1) {
        const { l, c, h } = d3.lch(color);
        return d3.lch(l + 30 * (1 - k), c * k, h);
    }

    return Object.assign(svg.node(), { scales: { color } });
}