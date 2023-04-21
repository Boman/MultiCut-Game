import * as d3 from "d3";

import { tapSound, ploppSound } from '$lib/sounds'

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
export function ForceGraph(
    {
        nodes, // an iterable of node objects (typically [{id}, …])
        links, // an iterable of link objects (typically [{source, target}, …])
        forceNodeStrength = -500,
        forceLinkStrength = 0.15,
        forceCollideStrength = 0.5,
        forcePositionStrength = 0
    },
    {
        nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 1.5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 25, // node radius, in pixels
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkValue = ({ value }) => value, // given d in links, returns a node identifier string
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        colors = d3.schemeDark2, // an array of color strings, for the node groups
        width = 1400, // outer width, in pixels
        height = 700, // outer height, in pixels
        svg,
        score
    } = {}
) {
    // Compute values.
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    const LV = d3.map(links, linkValue).map(intern);
    const nodeColoring = Array(nodes.length).fill(-1)
    const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
    const L = typeof linkStroke !== "function" ? null : d3.map(d3.map(links, linkStroke), d3.color);

    function intern(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
    }

    // Replace the input nodes and links with mutable objects for the simulation.
    //nodes = JSON.parse(JSON.stringify(nodes))
    nodes = d3.map(nodes, (n, i) => ({ id: n.id, positionX: n.x, positionY: n.y }));
    links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i], value: LV[i] }));

    {
        let minX = nodes[0].positionX
        let minY = nodes[0].positionY
        let maxX = nodes[0].positionX
        let maxY = nodes[0].positionY
        for (const d of nodes) {
            minX = Math.min(minX, d.positionX)
            minY = Math.min(minY, d.positionY)
            maxX = Math.max(maxX, d.positionX)
            maxY = Math.max(maxY, d.positionY)
        }
        for (const d of nodes) {
            d.positionX = (d.positionX - minX) / (maxX - minX)
            d.positionY = (d.positionY - minY) / (maxY - minY)
        }
    }

    // Construct the scales.
    const color = d3.scaleOrdinal(nodeColoring, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody().strength(forceNodeStrength).theta(0.5)
    const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]).strength(forceLinkStrength)

    const alphaTarget = 0.01

    // many body simulation is the main part of the force layout
    const simulation = d3
        .forceSimulation(nodes)
        .force("charge", forceNode)
        .force("link", forceLink)
        .force("center", d3.forceCenter())
        .force("collide", d3.forceCollide(nodeRadius * 2).strength(forceCollideStrength))
        .on("tick", ticked)
        .alphaTarget(alphaTarget)
        .alphaDecay(0.01)

    if (forcePositionStrength > 0) {
        simulation.force("position", forcePosition(forcePositionStrength))
    }

    function forcePosition(strength = 0.1) {
        let nodes;
        function force(alpha) {
            let nodeBounds = bounds(nodes)
            const l = alpha * strength;
            for (const d of nodes) {
                const cx = d.positionX * (nodeBounds.maxX - nodeBounds.minX) + nodeBounds.minX - d.x
                const cy = -d.positionY * (nodeBounds.maxY - nodeBounds.minY) + nodeBounds.minY - d.y
                d.vx -= (d.x - cx) * l
                d.vy -= (d.y - cy) * l
            }
        }

        force.initialize = _ => nodes = _

        return force
    }

    // helper function for placing nodes in x/y plane
    function bounds(nodes) {
        let minX = nodes[0].x
        let minY = nodes[0].y
        let maxX = nodes[0].x
        let maxY = nodes[0].y
        for (const d of nodes) {
            minX = Math.min(minX, d.x)
            minY = Math.min(minY, d.y)
            maxX = Math.max(maxX, d.x)
            maxY = Math.max(maxY, d.y)
        }
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }

    // svg visualisation elements

    var background = svg.append("rect")
        .attr("x", -width / 2)
        .attr("y", -height / 2)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "fill: black; fill-opacity: 0.0")
        .on("click", function (d) { click(d, null); })

    function linkStroke(l) {
        return l.value > 0 ? '#66B366' : '#FF6666'
    }

    const link = svg
        .append("g")
        .attr(
            "stroke",
            typeof linkStroke !== "function" ? linkStroke : null
        )
        .attr(
            "stroke-width",
            typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
        )
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("id", ({ index: i }) => "link_" + i)

    var link_annotations = svg.selectAll(".link_annotations")
        .data(links)
        .enter()
        .append("g")

    function link_circle_color(value) {
        return value > 0 ? "#D1E8D1" : "#FFB1B1"
    }

    var link_circles_background = link_annotations
        .append("circle")
        .attr("r", 13)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", "white")
        .attr("opacity", 0)

    var link_circles = link_annotations
        .append("circle")
        .attr("r", 13)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", (d, i) => link_circle_color(links[i].value))

    var link_label = link_annotations
        .append("text")
        .attr("font-size", 20)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .text((d, i) => links[i].value)

    var node_group = svg.selectAll(".node_group")
        .data(nodes)
        .enter()
        .append("g")
        .call(drag(simulation))

    const nodeGlow = node_group
        .append("circle")
        .attr("class", "blob")
        .attr("fill", "url(#g)")
        .attr("visibility", "hidden")
        .attr("r", nodeRadius)
        .attr("id", ({ index: i }) => "node_glow_" + i)

    nodeGlow.append("animateTransform")
        .attr("attributeName", "transform")
        .attr("type", "scale")
        .attr("keyTimes", "0;0.5;1")
        .attr("values", "1;1.6;1")
        .attr("dur", "1600ms")
        .attr("repeatCount", "indefinite")

    const node = node_group
        .append("circle")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .attr("r", nodeRadius)
        .on("click", click)
        .on("dblclick", dblclick)

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);


    let clickedNode: number = -1
    updateAfterMulticutChange()

    // main loop for simulation
    function ticked() {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node_group.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

        link_annotations.attr("transform", function (d, i) {
            var line_node = d3.select("#link_" + i)
            return "translate(" + (parseInt(line_node.attr("x1")) + parseInt(line_node.attr("x2"))) / 2 + "," + (parseInt(line_node.attr("y1")) + parseInt(line_node.attr("y2"))) / 2 + ")"
        })
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
            let eventNode = nodes.indexOf(event.subject)

            if (clickedNode != -1) {
                // filter nodes which are in the radius of the drag position
                let filteredNodes = nodes.filter(n => n != event.subject && Math.sqrt(Math.pow(n.x - event.x, 2) + Math.pow(n.y - event.y, 2)) < nodeRadius);
                if (filteredNodes.length == 1) {
                    let newIndex = nodes.indexOf(filteredNodes[0])
                    if (nodeColoring[newIndex] != nodeColoring[eventNode] || nodeColoring[eventNode] == -1) {
                        if (checkRestriction({ action: 'brush', aNode: newIndex })) {
                            if (nodeColoring[eventNode] == -1) {
                                // compute new color index for node to be excluded from color group
                                let n = Array.from(Array(nodes.length).keys()).filter(x => !nodeColoring.includes(x));
                                if (n.length > 0) {
                                    nodeColoring[eventNode] = n[0];
                                }
                            }

                            nodeColoring[newIndex] = nodeColoring[eventNode]
                            ploppSound.play()
                            if (event.subject.beforeDragX) {
                                event.subject.x = event.subject.beforeDragX;
                                event.subject.y = event.subject.beforeDragY;
                            }
                            updateAfterMulticutChange()
                        }
                    }
                }
            }
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(alphaTarget);
            event.subject.fx = null;
            event.subject.fy = null;

            nodes.forEach(n => {
                n.fx = null;
                n.fy = null;
            });
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function click(event, d) {
        let i: number = nodes.indexOf(d)
        if (checkRestriction({ action: 'select', aNode: i })) {
            clickedNode = i
            updateNodesAndLinksVisualisation()
        }
    }

    function updateNodesAndLinksVisualisation() {
        if (nodeColoring) {
            node.attr("fill",
                ({ index: i }) => {
                    let saturation = 1
                    if (clickedNode != -1 && clickedNode != i)
                        if (nodeColoring[clickedNode] != nodeColoring[i] || nodeColoring[i] == -1)
                            saturation = 0.32
                    let nodeColor = nodeColoring[i] == -1 ? d3.color("grey") : color(nodeColoring[i])
                    return saturate(nodeColor, saturation)
                })
        }
        if (L) {
            link.attr("stroke",
                ({ index: i }) => {
                    let stroke_color = linkStroke(links[i])
                    let saturation = 0.32
                    let opacity = 0.5
                    let source = nodes.indexOf(links[i].source)
                    let target = nodes.indexOf(links[i].target)
                    if (clickedNode == -1 ||
                        clickedNode == source ||
                        clickedNode == target ||
                        (nodeColoring[clickedNode] != -1 && (nodeColoring[clickedNode] == nodeColoring[source] || nodeColoring[clickedNode] == nodeColoring[target]))) {
                        saturation = 1
                        opacity = 1
                    }
                    return opace(saturate(stroke_color, saturation), opacity)
                })
            link_circles.attr("opacity",
                ({ index: i }) => {
                    let opacity = 0
                    let source = nodes.indexOf(links[i].source)
                    let target = nodes.indexOf(links[i].target)
                    if (clickedNode != -1) {
                        if (clickedNode == source ||
                            clickedNode == target ||
                            (nodeColoring[clickedNode] != -1 && (nodeColoring[clickedNode] == nodeColoring[source] || nodeColoring[clickedNode] == nodeColoring[target]))) {
                            opacity = 1
                        }
                    }
                    return opacity
                })
            link_label.attr("opacity",
                ({ index: i }) => {
                    let opacity = 0
                    let source = nodes.indexOf(links[i].source)
                    let target = nodes.indexOf(links[i].target)
                    if (clickedNode != -1) {
                        if (clickedNode == source ||
                            clickedNode == target ||
                            (nodeColoring[clickedNode] != -1 && (nodeColoring[clickedNode] == nodeColoring[source] || nodeColoring[clickedNode] == nodeColoring[target]))) {
                            opacity = 1
                        }
                    }
                    return opacity
                })
        }
    }

    function dblclick(event, d) {
        let i: number = nodes.indexOf(d)
        // if node is not a singleton
        if (nodeColoring[i] != -1) {
            if (checkRestriction({ action: 'detach', aNode: i })) {
                nodeColoring[i] = -1
                clickedNode = -1

                updateAfterMulticutChange()
                tapSound.play()
            }
        }
        event.stopImmediatePropagation()
    }

    function updateAfterMulticutChange() {
        // separate singular nodes from clusters
        let n = Array.from(Array(nodes.length).keys()).filter(x => nodeColoring.reduce((n, a) => n + (a == x), 0) == 1)
        for (let i of n) {
            nodeColoring[nodeColoring.indexOf(i)] = -1
        }

        calcScore()

        updateNodesAndLinksVisualisation()

        // visualise dashed line between nodes of different clusters/no cluster
        link.attr("stroke-dasharray", function (d, i) {
            if (nodeColoring[d.source.index] == -1 || nodeColoring[d.source.index] != nodeColoring[d.target.index]) {
                return "10, 30"
            } else {
                return "10, 0"
            }
        })
    }

    function calcScore() {
        let s = links.map(l => nodeColoring[nodes.indexOf(l.source)] != -1 && nodeColoring[nodes.indexOf(l.source)] != nodeColoring[nodes.indexOf(l.target)] ? 0 : l.value)
            .reduce((a, b) => a + b)
        score(s)
    }

    function saturate(color, k = 1) {
        const { l, c, h } = d3.lch(color);
        return d3.lch(l + 30 * (1 - k), c * k, h);
    }

    function opace(color, opacity = 0) {
        return color.copy({ opacity: opacity })
    }

    function stop() {
        simulation.stop()
    }

    function glowNode(glowNodes) {
        nodeGlow.attr("visibility", function (d, i) {
            if (glowNodes.some(n => i == n)) {
                return "visible"
            } else {
                return "hidden"
            }
        })
    }

    // restrict user interactions for tutorial
    let restrictions = []

    function restrictActions(newRestrictions) {
        restrictions = newRestrictions
    }

    function checkRestriction(restriction) {
        let { action, aNode } = restriction
        if (restrictions.length == 0) {
            return true
        }
        for (let r of restrictions) {
            if (r.action == action) {
                if (aNode == r.aNode) {
                    handleRestrictionChecked(restriction)
                    return true
                }
            }
        }
        return false
    }

    let restrictionCheckedHandlers = []

    function addRestrictionCheckedHandler(restrictionCheckedHandler) {
        restrictionCheckedHandlers.push(restrictionCheckedHandler)
    }

    function handleRestrictionChecked(restriction) {
        for (let rch of restrictionCheckedHandlers) {
            rch(restriction)
        }
    }

    function action(action) {
        if (action.action == 'select') {
            clickedNode = action.aNode
            updateNodesAndLinksVisualisation()
        }
    }

    return {
        stop: stop,
        glowNode: glowNode,
        restrictActions: restrictActions,
        addRestrictionCheckedHandler: addRestrictionCheckedHandler,
        action: action
    }
}