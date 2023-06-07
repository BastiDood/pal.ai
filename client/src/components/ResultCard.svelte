<script lang="ts">
    import type { LabelsRecord } from '../models/Classification';

    import Button from './Button.svelte';
    import SingleResult from './SingleResult.svelte';

    export let results: LabelsRecord;
</script>

<div class="root">
    <h1>Results (Top 5)</h1>
    <hr />
    <div class="group">
        {#each Object.entries(results) as [disease, confidence] (disease)}
            <SingleResult {disease} {confidence} />
        {/each}

        <Button>Try another photo</Button>
    </div>
</div>

<style>
    hr {
        border: 0.125rem solid var(--palai-yellow);
    }

    .root {
        border: 0.125rem solid var(--palai-black);
        border-radius: 0.5rem;
        background-color: var(--palai-white);
        box-shadow: 0.125rem 0.125rem;
        color: var(--palai-black);
        padding: 1rem;
        width: fit-content;
    }

    .group {
        display: grid;
        justify-content: space-around;
        gap: 0.75rem;
    }
</style>
