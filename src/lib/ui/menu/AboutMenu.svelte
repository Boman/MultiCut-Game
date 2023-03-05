<script lang="ts">
    import IconGithub from '$lib/icons/IconGithub.svelte'

    $: inIframe = window.location !== window.parent.location
</script>

<div class="bg-foreground-light rounded-xl p-5 flex flex-col gap-y-2 mb-2">
    <p class="font-bold font-black">Thank you for playing!</p>
    <hr class="mb-4 mt-3 text-gray" />
    <a class="font-medium font-black rounded-full bg-foreground p-2 min-w-full flex items-center hover:bg-foreground hover:scale-[1.02] transition-all" target="_blank" href="https://github.com/Boman/MultiCut-Game">
        <span class="ml-4 mr-2 text-gray"><IconGithub /></span>Contribute
    </a>
</div>
