<script lang="ts">
    // eslint-disable-next-line init-declarations
    export let id: number;
    // eslint-disable-next-line init-declarations
    export let name: string;
</script>

<div>
    <img src="https://avatars.githubusercontent.com/u/{id}" alt={name} />
    <slot />
    <span>(<a target="_blank" href="https://github.com/{name}">@{name}</a>)</span>
</div>

<style>
    div {
        align-items: center;
        display: flex;
        gap: 0.25rem;
        width: max-content;
    }

    a {
        margin: 0;
    }

    img {
        border-radius: 1rem;
        height: 2rem;
        object-fit: contain;
        width: 2rem;
    }
</style>
