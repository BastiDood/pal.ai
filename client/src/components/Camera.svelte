<script context="module">
    import { assert } from '../assert.ts';
    const { facingMode, width, height } = navigator.mediaDevices.getSupportedConstraints();
    assert(facingMode && width && height);
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    let video: HTMLVideoElement;

    onMount(() => {
        navigator
            .mediaDevices
            .getUserMedia({
                audio: false,
                video: { facingMode: 'environment' },
            })
            .then(stream => (video.srcObject = stream))
            .catch(console.error);
    });
</script>

<video autoplay bind:this={video}></video>

<style>
    video {
        max-height: 100%;
        max-width: 100%;
    }
</style>
