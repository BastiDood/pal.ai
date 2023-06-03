<script>
    import { register } from './register.ts';
    import Button from './lib/components/Button.svelte';
    import ResultPage from './ResultPage.svelte';
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        Done!
    {/await}

    <div>
        --Sample buttons--
        <br>
        <Button>Upload image</Button>
        <Button type="secondary">Back</Button>
        <br>

        --Sample results card--
        <br>
        <ResultPage/>
        
    </div>
    
</main>