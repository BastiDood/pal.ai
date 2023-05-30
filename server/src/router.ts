import { serveDir } from 'http/file';
import { Status } from 'http/status';
import { error, info } from 'log';
import { fromFileUrl } from 'path';

// HACK: Use a more robust way to resolve Linux and Windows file paths.
const STATIC_ROOT = fromFileUrl(import.meta.resolve('../../client/dist'));
info(`[Static] file server hosted at ${STATIC_ROOT}`);

function post(req: Request) {
    // TODO: Make Hugging Face API invocation.
    return new Response('Hello world!');
}

export function handle(req: Request) {
    switch (req.method) {
        case 'GET': return serveDir(req, { fsRoot: STATIC_ROOT });
        case 'POST': return post(req);
        default:
            error('unimplemented method accessed');
            return new Response(null, { status: Status.NotImplemented });
    }
}
