<script lang="ts">
    import Accuracy from './Accuracy.svelte';

    export let disease: string;
    export let accuracy: number;
</script>

<div>
    <p>Disease Identified: {disease}</p>
    <p>Accuracy: <Accuracy {accuracy} /></p>
</div>

<style>
    p {
        margin: 0;
    }
</style>
