<script lang="ts">
    import { Disease, displayDiseaseName } from '$lib/models/Classification';
    import Confidence from './ConfidenceScore.svelte';

    // eslint-disable-next-line init-declarations
    export let disease: Disease;
    // eslint-disable-next-line init-declarations
    export let confidence: number;

    $: name = displayDiseaseName(disease);
</script>

<div>
    <p class="name">{name}</p>
    <p>
        <span>Confidence</span>
        <Confidence {confidence} />
    </p>
</div>

<style>
    p {
        margin: 0;
        width: fit-content;
        padding: 0.15rem 0.85rem;
        color: var(--palai-black);
        font-family: inherit;
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
