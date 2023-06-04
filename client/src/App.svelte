<script>
    import { register } from './register.ts';
    import Button from './components/Button.svelte';
    import ResultCard from './components/ResultCard.svelte';
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        <Button>Upload Image</Button>
        <Button variant="secondary">Back</Button>
        <ResultCard accuracy={0.9667} disease="Tungro" />
    {/await}
</main>
