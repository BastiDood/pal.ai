<script>
    import { register } from './register.ts';
    import Button from './components/Button.svelte';
    import ResultPage from './ResultPage.svelte';
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        <Button>Upload image</Button>
        <Button variant="secondary">Back</Button>
        <ResultPage />
    {/await}
</main>
