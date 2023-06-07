<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { assert } from '../assert.ts';

    import Button from './Button.svelte';
    import Camera from './Camera.svelte';

    let camera: Camera | undefined;
    let dialog: HTMLDialogElement | undefined;
    let disabled = false;

    export async function open() {
        assert(await camera?.open());
        dialog?.showModal();
    }

    export function close() {
        dialog?.close();
    }

    const dispatch = createEventDispatcher();

    async function takePhoto() {
        disabled = true;
        const capture = await camera?.capture();
        if (capture)
            dispatch('image', capture);
        disabled = false;
    }
</script>

<dialog on:close={() => camera?.close()} on:close bind:this={dialog}>
    <div class="capture-container">
        <button on:click={() => dialog?.close()}>❌</button>
        <Camera bind:this={camera} />
    </div>
    <Button {disabled} variant="primary" on:click={takePhoto}>📸 Take picture</Button>
</dialog>

<style>
    button {
        appearance: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    button:hover {
        opacity: 50%;
    }

    dialog {
        border: none;
        border-radius: 0.45rem;
        box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
        padding: 1rem;
    }

    .capture-container {
        height: 25%;
        display: grid;
        justify-items: end;
        gap: 0.5rem;
    }
</style>
