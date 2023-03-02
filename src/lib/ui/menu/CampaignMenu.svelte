<script lang="ts">
    import Level from '$lib/ui/menu/Level.svelte'

    export let toggleMenu

    const level_imports = import.meta.glob('$lib/assets/campaign/*.json')
    let levels = []
    for (const path in level_imports) {
        level_imports[path]().then(l => {
            l.default.path = path
            if ('name' in l.default === false) {
                l.default.name = path.split('_').at(-1)?.split('.')[0]
            }
            levels = [...levels, l.default]
            levels.sort((a, b) => a.path.localeCompare(b.path))
        })
    }
</script>

<div class="p-2 rounded-md bg-foreground overflow-auto max-h-80">
    {#each levels as level}
        <Level {level} {toggleMenu} />
    {/each}
</div>
