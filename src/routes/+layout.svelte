<script>
    import './app.css';
    import User from './User.svelte';
</script>

<main>
    <slot />
    <footer>
        <p>Made in <a href="https://github.com/BastiDood/pal.ai" target="_blank" title="pal.ai">GitHub</a> by</p>
        <div>
            <User id={39114273} name="BastiDood">Basti Ortiz</User>
            <User id={98273014} name="Anjellyrika">Jelly Raborar</User>
            <User id={31538126} name="jkrperson">Jose Resabal</User>
            <User id={22850026} name="SporadicToast">Marc Macaraeg</User>
        </div>
    </footer>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        margin: 0 1rem;
    }

    footer > p {
        margin: 1rem;
        text-align: center;
    }

    footer > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 1rem;
    }
</style>
