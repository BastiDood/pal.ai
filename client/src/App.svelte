<script lang="ts">
    import { register } from './register.ts';
    import FileUpload from './components/FileUpload.svelte';
    import Button from './components/Button.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let src: string = '';

    function renderImage(event: CustomEvent) {
        src = URL.createObjectURL(event.detail);
    }
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        {#if src}
            <img {src} alt="upload" />
        {/if}
        <FileUpload on:image={renderImage} />
        <ResultCard accuracy={0.9667} disease="Tungro" />
    {/await}
</main>
