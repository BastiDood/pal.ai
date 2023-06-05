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
    <label for="upload">Upload Image</label>
    <input type="file" accept="image/*" name="upload" id="upload" bind:files />
    <Button type="submit">Submit</Button>
</form>

<style>
    input[type="file"] {
        display: none;
    }
</style>
