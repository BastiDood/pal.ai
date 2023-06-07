import { assertInstanceOf } from 'testing/asserts';
import { Status } from 'http/status';
import { critical, error, info, warning } from 'log';
import { ClassificationSchema } from 'model';
import { contentType } from 'media-types/content-type';
import { extname, fromFileUrl, join } from 'path';

import { env } from './env.ts';

// HACK: Use a more robust way to resolve Linux and Windows file paths.
const STATIC_ROOT = fromFileUrl(import.meta.resolve('../../client/dist'));
info(`[META] file server hosted at ${STATIC_ROOT}`);

async function get(req: Request) {
    const { pathname } = new URL(req.url);
    if (pathname === '/') {
        info('[GET] /');
        const { readable } = await Deno.open(STATIC_ROOT + pathname + '/index.html');
        return new Response(readable, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    const mime = contentType(extname(pathname));
    if (!mime) {
        error(`[GET] cannot determine MIME type of ${pathname}`);
        return new Response(null, { status: Status.BadRequest });
    }

    const path = join(STATIC_ROOT, pathname);
    try {
        const { readable } = await Deno.open(path);
        info(`[GET] ${pathname}`);
        return new Response(readable, { headers: { 'Content-Type': mime } });
    } catch (err) {
        assertInstanceOf(err, Deno.errors.NotFound);
        error(`[GET] ${pathname}`);
        return new Response(null, { status: Status.NotFound });
    }
}

async function post(req: Request) {
    info('[POST] uploading request');
    const res = await fetch('https://api-inference.huggingface.co/models/jkrperson/Beit-for-rice-disease', {
        headers: { Authorization: `Bearer ${env.API_KEY}` },
        method: 'POST',
        body: req.body,
    });
    info('[POST] receiving request');
    const json = await res.json();
    switch (res.status) {
        case Status.OK:
            info('[POST] successful upload to the model');
            return new Response(JSON.stringify(ClassificationSchema.parse(json)));
        case Status.ServiceUnavailable:
            warning(`[POST] model is still starting up ${JSON.stringify(json)}`);
            return new Response(null, { status: Status.ServiceUnavailable });
        default:
            critical(`[POST] unexpected status code ${res.status} ${JSON.stringify(json)}`);
            return new Response(null, { status: Status.NotImplemented });
    }
}

function route(method: string) {
    switch (method) {
        case 'GET': return get;
        case 'POST': return post;
        default: return null;
    }
}

export function handle(req: Request) {
    const handle = route(req.method);
    if (handle !== null) return handle(req);
    error(`[HTTP] unexpected ${req.method} ${req.url} request`);
    return new Response(null, { status: Status.MethodNotAllowed });
}
