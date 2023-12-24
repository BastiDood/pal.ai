<script lang="ts">
    import { assert } from '$lib/assert';

    // eslint-disable-next-line init-declarations
    let video: HTMLVideoElement | undefined;

    export async function open() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: 'environment' },
        });
        if (typeof video === 'undefined') return false;
        video.srcObject = stream;
        return true;
    }

    export function close() {
        if (typeof video === 'undefined' || video.srcObject === null) return false;
        assert(video.srcObject instanceof MediaStream);
        video.srcObject.getVideoTracks().forEach(track => track.stop());
        return true;
    }

    export function capture() {
        if (typeof video === 'undefined' || video.srcObject === null) return null;
        assert(video.srcObject instanceof MediaStream);
        const [track, ...rest] = video.srcObject.getVideoTracks();
        assert(typeof track !== 'undefined');
        assert(rest.length === 0);
        return new ImageCapture(track).takePhoto();
    }
</script>

<video muted autoplay bind:this={video}></video>

<style>
    video {
        max-height: 100%;
        max-width: 100%;
    }
</style>
