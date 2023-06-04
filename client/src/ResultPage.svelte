<script>
    import Accuracy from './components/Accuracy.svelte';
    import ResultCard from './components/ResultCard.svelte';

    let disease = "Tungro";
    let accuracy = 0.96967;
</script>

<ResultCard>
    <span slot="diagnosis">
        {#if disease}
            Disease identified: {disease}
        {:else}
            No disease identified!
        {/if}
    </span>
    <Accuracy {accuracy} slot="accuracy" />
</ResultCard>
