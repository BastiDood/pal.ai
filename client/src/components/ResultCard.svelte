<script lang="ts">
    import Accuracy from './Accuracy.svelte';
    import Button from './Button.svelte';

    export let accuracy: number;
    export let disease: string;
</script>

<div class="root">
    <h1>Results</h1>
    <hr />
    <p>Disease Identified: {disease}</p>
    <p>Accuracy: <Accuracy {accuracy} /></p>
    <div class="group">
        <Button variant="secondary">Re-run</Button>
        <Button>Try Another</Button>
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
        display: flex;
        justify-content: space-around;
    }
</style>
