<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { upload } from '../api/upload.ts';

    import Button from './Button.svelte';

    let files: FileList | undefined;
    $: [file, ..._] = files ?? [];

    const dispatch = createEventDispatcher();

    async function handleSubmit(this: HTMLFormElement) {
        if (typeof file === 'undefined') {
            alert("Please upload an image.");
            return;
        }
        const payload = await upload(file);
        dispatch('done', payload);
    }

    function handleChange() {
        if (typeof file !== 'undefined')
            dispatch('image', file);
    }
</script>

<form on:submit|self|preventDefault|stopPropagation={handleSubmit}>
    <label for="upload">🌾 Upload Image</label>
    <div>
        <input type="file" accept="image/*" name="upload" id="upload" bind:files on:change={handleChange} />    
        <Button type="submit">Submit</Button>
    </div>
</form>

<style>
    label {
        font-weight: 900;
        color: var(--palai-black);
    }

    input[type="file"]::file-selector-button {
        padding: 0.5rem 1rem 0.5rem;
        border: 0.125rem solid currentColor;
        border-radius: 0.25rem;
        background-color: transparent;
        color: var(--palai-black);
        cursor: pointer;
        font-weight: bold;
        transition: opacity 0.3s;
    }

    input[type="file"]::file-selector-button:active {   
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
	}

    input[type="file"]::file-selector-button:hover {   
        opacity: 0.45;
    }
</style>
