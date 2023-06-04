<script>
    import { register } from './register.ts';
    import Button from './lib/components/Button.svelte';
    import ResultPage from './ResultPage.svelte';
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        <p>--Sample buttons--</p>
        <Button>Upload image</Button>
        <Button type="secondary">Back</Button>

        <p>--Sample results card--</p>
        <ResultPage/>
    {/await}
</main>
