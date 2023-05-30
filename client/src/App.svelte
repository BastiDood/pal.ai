<script>
    import { register } from './register.ts';
</script>

<main>
    {#await register()}
        Loading service worker...
    {:then}
        Done!
    {/await}
</main>
