<script>
    import Button from "./Button.svelte";
</script>

<article>
	<h1>
		Results
	</h1>
	
	<slot name="diagnosis">
	</slot>
	
	<br>
	
    <span>Accuracy:</span>
	<slot name="accuracy">
	</slot>

    <br>
    <Button type="secondary">Re-run</Button>
    <Button>Try another</Button>
</article>

<style>
	article {
		padding: 1em;
		border: 2px solid var(--palai-black);
		border-radius: 8px;
		background-color: var(--palai-white);
		color: var(--palai-black);
		box-shadow: 2px 2px;
	}

	h1 {
		padding-bottom: 0.25em;
		border-bottom: 3px solid var(--palai-yellow);
	}
</style>