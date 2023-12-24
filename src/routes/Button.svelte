<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    export let type = 'button' as HTMLButtonAttributes['type'];
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
        border-radius: 0.75rem;
        color: var(--palai-black);
        cursor: pointer;
        font-family: inherit;
        padding: 0.5rem 1rem 0.5rem;
        filter: brightness(1);
        transition:
            filter 0.3s,
            color 0.3s;
    }

    button:active {
        box-shadow: inset 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
    }

    button:disabled:not([hover]) {
        opacity: 40%;
    }

    .primary {
        background-color: var(--palai-yellow);
    }

    .primary:hover {
        filter: brightness(1.1);
    }

    .secondary:hover {
        color: darkgrey;
    }

    .tertiary {
        background-color: var(--palai-green);
    }

    .tertiary:hover {
        filter: brightness(1.15);
    }
</style>
