<script context="module">
    import { assert } from '../assert.ts';
    const { facingMode, width, height } = navigator.mediaDevices.getSupportedConstraints();
    assert(facingMode && width && height);
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    let video: HTMLVideoElement | undefined;
    onMount(() => {
        navigator
            .mediaDevices
            .getUserMedia({
                audio: false,
                video: { facingMode: 'environment' },
            })
            .then(stream => {
                assert(typeof video !== 'undefined');
                video.srcObject = stream;
            })
            .catch(console.error);
    });

    export function capture() {
        if (typeof video === 'undefined' || video.srcObject === null)
            return null;

        assert(video.srcObject instanceof MediaStream);
        const [track, ...rest] = video.srcObject.getVideoTracks();
        assert(typeof track !== 'undefined');
        assert(rest.length === 0);

        const cap = new ImageCapture(track);
        return cap.takePhoto();
    }
</script>

<video autoplay bind:this={video}></video>

<style>
    video {
        max-height: 100%;
        max-width: 100%;
    }
</style>
