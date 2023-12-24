<script lang="ts">
    import Button from './Button.svelte';
    import Camera from './Camera.svelte';
    import { assert } from '$lib/assert';
    import { createEventDispatcher } from 'svelte';

    // eslint-disable-next-line init-declarations
    let dialog: HTMLDialogElement | undefined;
    export function close() {
        dialog?.close();
    }

    // eslint-disable-next-line init-declarations
    let camera: Camera | undefined;
    export async function open() {
        assert(await camera?.open());
        dialog?.showModal();
    }

    let disabled = false;
    const dispatch = createEventDispatcher<{ image: Blob }>();
    async function takePhoto() {
        disabled = true;
        try {
            const capture = await camera?.capture();
            if (capture) dispatch('image', capture);
        } finally {
            disabled = false;
        }
    }
</script>

<dialog on:close={() => camera?.close()} on:close bind:this={dialog}>
    <div class="capture-container">
        <button on:click={() => dialog?.close()}>❌</button>
        <Camera bind:this={camera} />
        <Button {disabled} variant="primary" on:click={takePhoto}>📸 Take picture</Button>
    </div>
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
