<script lang="ts">
    import { onDestroy } from 'svelte';

    import { register } from './register.ts';

    import FileUpload from './components/FileUpload.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let src = '';
    function renderImage(event: CustomEvent<File>) {
        if (src) URL.revokeObjectURL(src);
        src = URL.createObjectURL(event.detail);
    }

    onDestroy(() => {
        if (src) URL.revokeObjectURL(src);
    });
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
        align-content: center;
        display: grid;
        grid-gap: 1rem;
        height: 100vh;
        justify-items: center;
    }

    .img-container {
        align-items: center;
        border: 0.125rem solid var(--palai-black);
        border-radius: 0.5rem;
        display: flex;
        font-size: 2rem;
        height: 224px;
        justify-content: center;
        width: 224px;
    }

    img {
        height: inherit;
        width: inherit;
    }
</style>
