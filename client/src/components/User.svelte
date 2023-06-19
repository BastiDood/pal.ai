<script lang="ts">
    export let id: number;
    export let name: string;
</script>

<div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="https://avatars.githubusercontent.com/u/{id}" />
    <slot></slot>
    <span>
        (<a href="https://github.com/{name}">@{name}</a>)
    </span>
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
