<script lang="ts">
    export let type = 'button' as HTMLButtonElement['type'];
    export let variant = 'primary';
    export let disabled = false;
</script>

<button {type} {disabled} class={variant} on:click>
    <slot />
</button>

<style>
    button {
        background-color: transparent;
        border: 0.125rem solid currentColor;
        border-radius: 0.25rem;
        color: var(--palai-black);
        cursor: pointer;
        font-family: inherit;
        padding: 0.5rem 1rem 0.5rem;
        transition:
            background-color 0.3s,
            border-color 0.3s,
            color 0.3s;
    }

    button:active {
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
    }

    .primary {
        background-color: var(--palai-yellow);
    }

    .primary:hover {
        background-color: var(--palai-yellow-hover);
        color: var(--palai-yellow-text-hover);
    }

    .secondary:hover {
        color: darkgrey;
    }
</style>
