<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { upload } from '../api/upload.ts';

    import Button from './Button.svelte';

    let files: FileList | undefined;
    $: [file, ..._] = files ?? [];

    const dispatch = createEventDispatcher();
    async function handleSubmit(this: HTMLFormElement) {
        if (typeof file === 'undefined') return;
        const payload = await upload(file);
        dispatch('done', payload);
    }
</script>

<form on:submit|self|preventDefault|stopPropagation={handleSubmit}>
    <label for="upload">🌾 Upload Image</label>
    <input type="file" accept="image/*" name="upload" id="upload" bind:files />
    <Button type="submit">Submit</Button>
</form>

<style>
    input[type="file"] {
        display: none;
    }
    
    label {
        width: fit-content;
        padding: 0.5rem 1rem 0.5rem;
        border: 0.125rem solid currentColor;
        border-radius: 0.25rem;
        color: var(--palai-black);
        cursor: pointer;
        font-weight: bold;
        transition: opacity 0.3s;
    }

    label:active {
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
	}

    label:hover {
        opacity: 0.45;
    }
</style>
