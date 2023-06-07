<script lang="ts">
    import { displayNames } from '../utils';
    
    import Accuracy from './Accuracy.svelte';

    export let disease: string;
    export let accuracy: number;
</script>

<div>
    {#if disease == 'healthy_rice_plant'}
        <p>Healthy (No disease identified)</p>
    {:else}
        <p>Disease Identified: {displayNames(disease)}</p>
    {/if}
    <p>Accuracy: <Accuracy {accuracy} /></p>
</div>

<style>
    p {
        margin: 0;
    }
</style>
