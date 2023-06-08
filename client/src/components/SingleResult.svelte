<script lang="ts">
    import { displayNames } from '../utils.ts';
    import { Disease } from '../models/Classification.ts';

    import Confidence from './ConfidenceScore.svelte';

    export let disease: Disease;
    export let confidence: number;
</script>

<div>
    <p class="name">{displayNames(disease)}</p>
    <p>Confidence: <Confidence {confidence} /></p>
</div>

<style>
    p {
        margin: 0;
        width: fit-content;
        padding: 0.15rem 0.85rem;
        color: var(--palai-black);
        font: inherit;
    }

    .name {
        border-radius: 0.75rem;
        background-color: var(--palai-green);
        color: var(--palai-black);
    }

    div {
        display: flex;
        justify-content: space-between;
    }
</style>
