<script lang="ts">
    import { assert } from '$lib/assert';
    import { createEventDispatcher } from 'svelte';

    // eslint-disable-next-line init-declarations
    let files: FileList | undefined;
    $: [file, ...rest] = files ?? [];
    $: assert(rest.length === 0);

    const dispatch = createEventDispatcher<{ image: File }>();
    function handleChange() {
        if (typeof file !== 'undefined') dispatch('image', file);
    }
</script>

<input type="file" accept="image/*" name="upload" bind:files on:change={handleChange} />

<style>
    input[type='file'] {
        cursor: pointer;
        font-family: inherit;
        border: 0.125rem solid currentColor;
        border-radius: 0.75rem;
        background-color: lightgray;
        filter: brightness(1);
        transition: filter 0.3s;
    }

    input[type='file']:hover {
        filter: brightness(1.1);
    }

    input[type='file']::file-selector-button {
        border: none;
        background-color: var(--palai-yellow);
        color: var(--palai-black);
        cursor: pointer;
        font-weight: bold;
        padding: 0.5rem 1rem 0.5rem;
    }

    input[type='file']::file-selector-button:active {
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
    }
</style>
