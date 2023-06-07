<script lang="ts">
    import { displayNames } from '../utils';
    
    import Confidence from './ConfidenceScore.svelte';

    export let disease: string;
    export let confidence: number;
</script>

<div>
    {#if disease == 'healthy_rice_plant'}
        <p>Healthy (No disease identified)</p>
    {:else}
        <p>Disease Identified: {displayNames(disease)}</p>
    {/if}
    <p>Confidence: <Confidence {confidence} /></p>
</div>

<style>
    p {
        margin: 0;
    }
</style>
