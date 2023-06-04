<script>
    import ResultCard from './lib/components/ResultCard.svelte';

    // Dummy variables to test ResultCard
    let disease = "Tungro";         // disease found
    // let disease = ""             // no disease found
    let accuracy_score = 0.96967;   // try changing this value!
    
    let score = "low";
    if (accuracy_score > 0.95) {
        score = "high";
    }
    else if (accuracy_score >= 0.80 && accuracy_score <= 0.95) {
        score = "medium";
    }

</script>

<main>
    <ResultCard>
        <span slot="diagnosis">
            {#if disease}
                Disease identified: {disease}
            {:else}
                No disease identified!
            {/if}
        </span>
        <span slot="accuracy" class={score}>
            {accuracy_score*100}%
        </span>
    </ResultCard>
</main>

<style>
	.high {
		color: var(--success-green);
	}
	
	.medium {
		color: var(--warning-orange);
	}
	
	.low {
		color: var(--danger-red);
	}
</style>
