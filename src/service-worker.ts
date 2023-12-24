/// <reference types="@sveltejs/kit" />
/// <reference types="@types/serviceworker" />

import { build, files, version } from '$service-worker';
import { assert } from './lib/assert';

async function installWorker() {
    const cache = await caches.open(version);
    await cache.addAll([
        ...build,
        ...files,
        'https://avatars.githubusercontent.com/u/39114273',
        'https://avatars.githubusercontent.com/u/98273014',
        'https://avatars.githubusercontent.com/u/31538126',
        'https://avatars.githubusercontent.com/u/22850026',
    ]);
}

function* deleteAll(keys: Iterable<string>) {
    for (const key of keys) if (key !== version) yield caches.delete(key);
}

async function activateWorker() {
    const keys = await caches.keys();
    const results = await Promise.all(deleteAll(keys));
    assert(
        results.every(x => x),
        'cannot delete all cache versions',
    );
}

async function interceptFetch(req: Request) {
    const cache = await caches.open(version);
    const res = await cache.match(req);
    return res ?? fetch(req);
}

self.addEventListener(
    'install',
    evt => {
        assert(evt instanceof ExtendableEvent);
        evt.waitUntil(installWorker());
    },
    { once: true, passive: true },
);

self.addEventListener(
    'activate',
    evt => {
        assert(evt instanceof ExtendableEvent);
        evt.waitUntil(activateWorker());
    },
    { once: true, passive: true },
);

self.addEventListener(
    'fetch',
    evt => {
        assert(evt instanceof FetchEvent);
        evt.respondWith(interceptFetch(evt.request));
    },
    { passive: true },
);
