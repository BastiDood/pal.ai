import { assertInstanceOf, unimplemented } from 'testing/asserts';
import { Status } from 'http/status';
import { error, info } from 'log';
import { contentType } from 'media-types/content-type';
import { extname, fromFileUrl, join } from 'path';

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

function post(req: Request): Response {
    unimplemented();
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
