<script lang="ts">
    import { onDestroy } from 'svelte';
    import { assert } from './assert.ts';

    import { register } from './register.ts';
    import { upload } from './api/upload.ts';
    import type { LabelsRecord } from './models/Classification.ts';

    import Button from './components/Button.svelte';
    import Capture from './components/Capture.svelte';
    import FileUpload from './components/FileUpload.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let capture: Capture | undefined;

    interface State {
        blob: Blob;
        url: string;
    }
    
    let state = null as State | LabelsRecord | null;

    function revokeBlobUrl() {
        if (state !== null && 'url' in state)
            URL.revokeObjectURL(state.url);
    }

    function renderImage({ detail }: CustomEvent<Blob>) {
        revokeBlobUrl();
        state = {
            blob: detail,
            url: URL.createObjectURL(detail),
        } satisfies State;
    }

    function closeAfterRenderImage(event: CustomEvent<Blob>) {
        renderImage(event);
        capture?.close();
    }

    function resetUpload() {
        state = null;
    }

    async function handleSubmit(this: HTMLFormElement) {
        if (state === null) {
            alert('Please upload an image.');
            return;
        }

        assert('blob' in state);
        const payload = await upload(state.blob);
        if (payload === null) {
            alert('The model is still starting up. Please try again later.');
            return;
        }

        revokeBlobUrl();
        this.reset();
        state = payload;
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
            {:else if 'url' in state}
                <img src={state.url} alt="upload" />
            {/if}
        </div>
        {#if state === null || 'blob' in state}
            <form on:submit|self|preventDefault|stopPropagation={handleSubmit}>
            <label for="upload">🌾 Upload Image</label>
            <div>
                <FileUpload on:image={renderImage} />
                <Button type="submit" variant="tertiary">Submit</Button>
            </div>
            </form>
            <Button on:click={() => capture?.open()}>📷 Open Webcam</Button>
        {:else}
            <ResultCard results={state} on:reset={resetUpload}/>
        {/if}
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
    
    label {
        color: var(--palai-black);
        font-weight: 900;
    }
</style>
