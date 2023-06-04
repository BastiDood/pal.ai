<script>
    export let type = "primary";
    export let disabled = false;
</script>

<button class={type} {disabled} on:click>
    <slot />
</button>

<style>
    button {
        border: 2px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        padding: 0.5em 1em 0.5em;
        color: var(--palai-black);
        transition: background 0.1s;
    }

    .primary {
        background-color: var(--palai-yellow);
    }

    .primary:active {
        box-shadow: inset 2px 2px rgba(0, 0, 0, 0.4);
    }

    .primary:hover {
        background-color: var(--palai-yellow-hover);
        color: #8c8076;
    }

    .secondary {
        border-color: var(--palai-black);
        background-color: transparent;
    }

    .secondary:active {
        box-shadow: inset 2px 2px rgba(0, 0, 0, 0.4);
    }

    .secondary:hover {
        border-color: darkgrey;
        color: darkgrey;
    }
</style>
