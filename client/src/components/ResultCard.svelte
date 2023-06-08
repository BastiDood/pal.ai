<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { displayNames } from '../utils.ts';
    import { type Classification, Disease } from '../models/Classification.ts';

    import Button from './Button.svelte';
    import { toClass } from './ConfidenceScore.svelte';
    import SingleResult from './SingleResult.svelte';

    export let results: Classification;
    $: [top, ...others] = results;

    const dispatch = createEventDispatcher();
</script>

<div class="root">
    <h1>Top Result</h1>
    <hr />
    <div class="group">
        {#if typeof top === 'undefined'}
            Nothing to display.
        {:else}
            {@const confidenceClass = toClass(top.score)}
            {@const score = top.score * 100}
            <div class="top">
                <h2 class="first">{displayNames(top.label)}</h2>
                <p class={confidenceClass}>{score.toFixed(2)}%</p>
            </div>
            <details>
                <summary>More results...</summary>
                <div class="group">
                    {#each others as { label: disease, score: confidence } (disease) }
                        <SingleResult {disease} {confidence} />
                    {/each}
                </div>
            </details>

        {/if}
        <Button on:click={() => dispatch('reset')}>Try another photo</Button>
    </div>
</div>

<style>
    .root {
        background-color: var(--palai-white);
        border: 0.125rem solid var(--palai-black);
        border-radius: 0.5rem;
        box-shadow: 0.125rem 0.125rem;
        color: var(--palai-black);
        padding: 1rem;
        width: fit-content;
    }

    .top {
        align-items: center;
        border: 2px solid var(--palai-green);
        border-radius: 5rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding: 0.5rem 1rem;
    }

    .top > p:last-child {
        align-items: center;
        aspect-ratio: 1;
        border-radius: 50%;
        display: flex;
        color: var(--palai-white);
        margin: 0.5rem 0;
        padding: 0.25rem;
        text-align: center;
        width: min-content;
    }

	.top > p:last-child.high {
		background-color: var(--success-green);
	}

	.top > p:last-child.medium {
		background-color: var(--warning-orange);
	}

	.top > p:last-child.low {
		background-color: var(--danger-red);
	}

    .first {
        margin: 0;
        width: 75%;
        color: var(--palai-black);
        font-weight: bold;
        overflow-wrap: break-word;
        text-align: center;
    }

    hr {
        border: 0.125rem solid var(--palai-yellow);
    }

    .group {
        display: grid;
        justify-content: space-around;
        gap: 0.75rem;
    }
</style>
