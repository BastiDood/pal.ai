<script lang="ts">
    import { onDestroy } from 'svelte';

    import { register } from './register.ts';

    import Button from './components/Button.svelte';
    import Capture from './components/Capture.svelte';
    import FileUpload from './components/FileUpload.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let capture: Capture | undefined;

    let src = '';

    function renderImage(event: CustomEvent<Blob>) {
        if (src) URL.revokeObjectURL(src);
        src = URL.createObjectURL(event.detail);
    }

    function closeAfterRenderImage(event: CustomEvent<Blob>) {
        renderImage(event);
        capture?.close();
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
        <Button on:click={() => capture?.open()}>📷 Open Webcam</Button>
    {/await}
</main>
<Capture bind:this={capture} on:image={closeAfterRenderImage} />

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
