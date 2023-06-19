<script lang="ts">
    import { onDestroy } from 'svelte';
    import { expoOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    import { assert } from './assert.ts';
    import { register } from './register.ts';
    import { upload } from './api/upload.ts';
    import type { Classification } from './models/Classification.ts';

    import Button from './components/Button.svelte';
    import Capture from './components/Capture.svelte';
    import FileUpload from './components/FileUpload.svelte';
    import Loading from './components/Loading.svelte';
    import ResultCard from './components/ResultCard.svelte';
    import User from './components/User.svelte';

    let capture: Capture | undefined;

    interface State {
        blob: Blob;
        url: string;
        results?: Classification | null;
    }

    let state = null as State | null;

    function revokeBlobUrl() {
        if (state !== null)
            URL.revokeObjectURL(state.url);
    }

    function swapImage({ detail }: CustomEvent<Blob>) {
        revokeBlobUrl();
        state = { blob: detail, url: URL.createObjectURL(detail) } satisfies State;
    }

    function closeAfterSwapImage(event: CustomEvent<Blob>) {
        swapImage(event);
        capture?.close();
    }

    function resetUpload() {
        revokeBlobUrl();
        state = null;
    }

    async function handleSubmit(this: HTMLFormElement) {
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

        this.reset();
        state = { ...state, results } satisfies State;
    }

    onDestroy(revokeBlobUrl);
</script>

<main>
    {#await register()}
        <Loading />
    {:then}
        <section>
            <div class="img-container">
                {#if state === null}
                    🌾
                {:else}
                    <img src={state.url} alt="upload" />
                {/if}
            </div>
            {#if state === null || typeof state.results === 'undefined'}
                <form on:submit|self|preventDefault|stopPropagation={handleSubmit}>
                    <label for="upload">📤 Upload Image</label>
                    <div class="upload-choice">
                        <FileUpload on:image={swapImage} />
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
                    <div class="result" in:fly={{y: 50, duration: 1200, easing: expoOut}}>
                        <ResultCard {results} on:reset={resetUpload} />
                    </div>
                {/if}
            {/if}
        </section>
    {/await}
    <footer>
        <p>Made in <a href="https://github.com/BastiDood/pal.ai" title="pal.ai">GitHub</a> by</p>
        <div>
            <User id={39114273} name="BastiDood">Basti Ortiz</User>
            <User id={98273014} name="Anjellyrika">Jelly Raborar</User>
            <User id={31538126} name="jkrperson">Jose Resabal</User>
            <User id={22850026} name="SporadicToast">Marc Macaraeg</User>
        </div>
    </footer>
</main>
<Capture bind:this={capture} on:image={closeAfterSwapImage} />

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        margin: 0 1rem;
    }

    section {
        align-items: center;
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
    }

    footer > p {
        margin: 1rem;
        text-align: center;
    }

    footer > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 1rem;
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
