<script lang="ts">
    import { register } from './register.ts';
    import FileUpload from './components/FileUpload.svelte';
    import Button from './components/Button.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let src = '';

    function renderImage(event: CustomEvent) {
        src = URL.createObjectURL(event.detail);
    }
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        <div class="img-container">
            {#if src}
                <img {src} alt="upload" />
            {:else}
                🗋
            {/if}
        </div>
        <FileUpload on:image={renderImage} />
        <ResultCard accuracy={0.9667} disease="Tungro" />
    {/await}
</main>

<style>
    main {
        height: 100vh;
        display: grid;
        grid-gap: 1rem;
        justify-items: center;
        align-content: center;
    }
    .img-container {
        width: 224px;
        height: 224px;
        border: 0.125rem solid var(--palai-black);
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }

    img {
        width: inherit;
        height: inherit;
    }
</style>
