<script lang="ts">
    import Button from './Button.svelte';
    import Capture from './Capture.svelte';
    import type { Classifications } from '$lib/models/Classification';
    import FileUpload from './FileUpload.svelte';
    import Loading from './Loading.svelte';
    import ResultCard from './ResultCard.svelte';
    import { assert } from '$lib/assert';
    import { expoOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { onDestroy } from 'svelte';
    import { upload } from '$lib/upload';

    interface State {
        blob: Blob;
        url: string;
        results?: Classifications | null;
    }

    // eslint-disable-next-line init-declarations
    let capture: Capture | undefined;
    let state = null as State | null;

    function revokeBlobUrl() {
        if (state !== null) URL.revokeObjectURL(state.url);
    }

    function swapImage(blob: Blob) {
        revokeBlobUrl();
        state = { blob, url: URL.createObjectURL(blob) };
    }

    function closeAfterSwapImage(blob: Blob) {
        swapImage(blob);
        capture?.close();
    }

    function resetUpload() {
        revokeBlobUrl();
        state = null;
    }

    async function handleSubmit(form: HTMLFormElement) {
        if (state === null) {
            alert('Please upload an image.');
            return;
        }

        state = { ...state, results: null };
        const results = await upload(state.blob);
        if (results === null) {
            assert(delete state.results);
            state = state;
            alert('The model is still starting up. Please try again later.');
            return;
        }

        form.reset();
        state = { ...state, results };
    }

    onDestroy(revokeBlobUrl);
</script>

<section>
    <div class="img-container">
        {#if state === null}
            🌾
        {:else}
            <img src={state.url} alt="upload" />
        {/if}
    </div>
    {#if state === null || typeof state.results === 'undefined'}
        <form
            method="POST"
            on:submit|self|preventDefault|stopPropagation={({ currentTarget }) => handleSubmit(currentTarget)}
        >
            <label for="upload">📤 Upload Image</label>
            <div class="upload-choice">
                <FileUpload on:image={({ detail }) => swapImage(detail)} />
                <p>OR</p>
                <Button type="button" on:click={() => capture?.open()}>📷 Open Camera</Button>
            </div>
            <div class="submitBtn">
                <Button type="submit" variant="tertiary">Submit</Button>
            </div>
        </form>
    {:else}
        {@const { results } = state}
        {#if results === null}
            <Loading />
        {:else}
            <div class="result" in:fly={{ y: 50, duration: 1200, easing: expoOut }}>
                <ResultCard {results} on:reset={resetUpload} />
            </div>
        {/if}
    {/if}
</section>
<Capture bind:this={capture} on:image={({ detail }) => closeAfterSwapImage(detail)} />

<style>
    section {
        align-items: center;
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
    }

    form {
        margin: 0 auto;
        max-width: 360px;
        width: 100%;
    }

    label {
        font-weight: 900;
        color: var(--palai-black);
    }

    .img-container {
        align-items: center;
        border: 0.125rem solid var(--palai-black);
        border-radius: 0.5rem;
        display: flex;
        font-size: 2rem;
        height: 224px;
        justify-content: center;
        margin: 0 auto;
        object-fit: contain;
        width: 224px;
    }

    img {
        height: inherit;
        width: inherit;
    }

    .upload-choice {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }

    .upload-choice > p {
        margin: 0;
        text-align: center;
    }

    .submitBtn {
        float: right;
    }
</style>
