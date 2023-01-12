// sparseness in range 0-1 (number of edges in range N-1 to N(N-1)/2)
export function randomGraph(N = 10, sparseness = 0.5) {
    let nodes = []
    for (let i = 0; i < N; i++) {
        nodes.push({ 'id': i });
    }

    let links = []

    let allLinks: { source: number, target: number }[] = []
    for (let source = 0; source < N; source++) {
        for (let target = source + 1; target < N; target++) {
            allLinks.push({
                'source': source,
                'target': target
            })
        }
    }

    // create uniform spanning tree
    let currentNode = Math.floor(Math.random() * N)
    let visitedNodes: [number] = []
    visitedNodes.push(currentNode)
    while (visitedNodes.length < N) {
        let newNode = Math.floor(Math.random() * (N - 1))
        if (newNode >= currentNode) {
            newNode += 1
        }

        if (!visitedNodes.some(n => n == newNode)) {
            visitedNodes.push(newNode)
            let value = Math.floor(Math.random() * 18) - 8
            if (value <= 0) {
                value -= 1
            }
            links.push({
                'source': currentNode,
                'target': newNode,
                'value': value
            })
            allLinks = allLinks.filter(l => !((l.source == currentNode && l.target == newNode)
                || (l.source == newNode && l.target == currentNode)))
        }
        currentNode = newNode
    }

    for (let i = 0; i < sparseness * sparseness * (N - 1) * (N - 2) / 2; i++) {
        const index = Math.floor(Math.random() * allLinks.length)
        const { source, target } = allLinks[index]
        let value = Math.floor(Math.random() * 18) - 8
        if (value <= 0) {
            value -= 1
        }
        links.push({
            'source': source,
            'target': target,
            'value': value
        })
        allLinks.splice(index, 1)
        //allLinks = allLinks.filter(l => (l.source != source && l.target != target) || (l.source != target && l.target != source))
    }

    return { 'nodes': nodes, 'links': links }
}

export function ladderGraph(N = 10) {
    let nodes = []
    for (let i = 0; i < N * 2; i++) {
        nodes.push({ 'id': i });
    }

    let links = []

    for (let i = 0; i < N; i++) {
        let value = Math.floor(Math.random() * 18) - 8
        if (value <= 0) {
            value -= 1
        }
        links.push({
            'source': i * 2,
            'target': i * 2 + 1,
            'value': value
        })

        value = Math.floor(Math.random() * 18) - 8
        if (value <= 0) {
            value -= 1
        }
        links.push({
            'source': i * 2,
            'target': ((i + 1) % N) * 2 + Math.floor((i + 1) / N),
            'value': value
        })

        value = Math.floor(Math.random() * 18) - 8
        if (value <= 0) {
            value -= 1
        }
        links.push({
            'source': i * 2 + 1,
            'target': ((i + 1) % N) * 2 + 1 - Math.floor((i + 1) / N),
            'value': value
        })
    }

    return { 'nodes': nodes, 'links': links }
}