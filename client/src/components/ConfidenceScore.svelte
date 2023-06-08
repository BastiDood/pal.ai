<script context="module" lang="ts">
    export function toClass(confidence: number) {
        if (confidence < 0)
            return null;
        if (confidence < 0.75)
            return 'low';
        if (confidence < 0.9)
            return 'medium';
        if (confidence <= 1.0)
            return 'high';
        return null;
    }
</script>

<script lang="ts">
    export let confidence: number;
    $: css = toClass(confidence);
</script>

{#if css === null}
    <span class="low">Out of bounds!</span>
{:else}
    {@const score = confidence * 100}
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
