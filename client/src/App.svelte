<script lang="ts">
    import { onDestroy } from 'svelte';

    import { register } from './register.ts';

    import Button from './components/Button.svelte';
    import Capture from './components/Capture.svelte';
    import FileUpload from './components/FileUpload.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let capture: Capture | undefined;

    interface State {
        blob: Blob;
        url: string;
    }

    let state = null as State | null;

    function revokeBlobUrl() {
        if (state !== null)
            URL.revokeObjectURL(state.url);
    }

    function renderImage({ detail }: CustomEvent<Blob>) {
        revokeBlobUrl();
        state = {
            blob: detail,
            url: URL.createObjectURL(detail),
        };
    }

    function closeAfterRenderImage(event: CustomEvent<Blob>) {
        renderImage(event);
        capture?.close();
    }

    onDestroy(revokeBlobUrl);
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        <div class="img-container">
            {#if state === null}
                🗋
            {:else}
                <img src={state.url} alt="upload" />
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
        justify-content: center;
        height: 224px;
        width: 224px;
        object-fit: contain;
    }

    img {
        height: inherit;
        width: inherit;
    }
</style>
