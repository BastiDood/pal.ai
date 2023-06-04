<script context="module" lang="ts">
    function toClass(accuracy: number) {
        if (accuracy < 0)
            return null;
        if (accuracy < 0.8)
            return 'low';
        if (accuracy < 0.95)
            return 'medium';
        if (accuracy <= 1.0)
            return 'high';
        return null;
    }
</script>

<script lang="ts">
    export let accuracy: number;
    $: css = toClass(accuracy);
</script>

{#if css === null}
    <span class="low">Out of bounds!</span>
{:else}
    {@const score = accuracy * 100}
    <span class={css}>{score.toFixed(2)}%</span>
{/if}

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
