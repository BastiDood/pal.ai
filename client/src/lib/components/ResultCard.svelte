<script>
    import Button from "./Button.svelte";
</script>

<article>
    <h1>Results</h1>

    <slot name="diagnosis" />

    <br />

    <span>Accuracy:</span>
    <slot name="accuracy" />

    <div class="buttongroup">
        <Button type="secondary">Re-run</Button>
        <Button>Try another</Button>
    </div>
</article>

<style>
    article {
        margin: 1.75em;
        padding: 1em;
        min-width: 25%;
        max-width: fit-content;
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

    .buttongroup {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 1.25em;
    }
</style>