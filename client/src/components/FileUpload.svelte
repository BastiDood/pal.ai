<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let files: FileList | undefined;
    $: [file, ..._] = files ?? [];

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (typeof file !== 'undefined')
            dispatch('image', file);
    }
</script>

<input type="file" accept="image/*" name="upload" id="upload" bind:files on:change={handleChange} />

<style>
    input[type="file"] {
        cursor: pointer;
        font-family: inherit;
        border: 0.125rem solid currentColor;
        border-radius: 0.75rem;
        background-color: lightgray;
        filter: brightness(1);
        transition: filter 0.3s;
    }

    input[type="file"]:hover {
        filter: brightness(1.10);
    }

    input[type="file"]::file-selector-button {
        border: none;
        background-color: var(--palai-yellow);
        color: var(--palai-black);
        cursor: pointer;
        font-weight: bold;
        padding: 0.5rem 1rem 0.5rem;
    }

    input[type="file"]::file-selector-button:active {
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
	}
</style>
