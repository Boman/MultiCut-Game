<style>
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
    }
    body {
        background-color: var(--dark-gray);
        background-image: radial-gradient(circle, var(--dark-gray), black);
        display: flex;
        flex-direction: column;
        font-family: -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        opacity: 1;
        overflow: hidden;
        padding: 0;
        transition: opacity 1s;
    }
</style>

<script lang="ts">
    const width: number = 5
    const height: number = 5

    let content: string = ''
    let nodes: string[] = []
    let links: string[] = []
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            nodes.push('{"id":"x' + x + ',y' + y + '"}')
            for (const [x2, y2] of [
                [0, 1],
                [1, 0]
            ] as const) {
                if (x + x2 < width && y + y2 < height) {
                    let value: number = 0
                    while (value == 0) {
                        value = Math.round(Math.random() * 20 - 10)
                    }
                    links.push('{"source":"x' + x + ',y' + y + '","target":"x' + (x + x2) + ',y' + (y + y2) + '","value":' + value + '}')
                }
            }
        }
    }
    content = '{"nodes":[' + nodes.join(',') + '], "links":[' + links.join(',') + ']}'
</script>

<main>
    <pre>{content}</pre>
</main>
