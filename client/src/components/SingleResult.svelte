<script lang="ts">
    import { displayNames } from '../utils.ts';
    import { Disease } from '../models/Classification.ts';

    import Confidence from './ConfidenceScore.svelte';

    export let disease: Disease;
    export let confidence: number;
</script>

<div>
    {#if disease === Disease.HealthyRicePlant}
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
