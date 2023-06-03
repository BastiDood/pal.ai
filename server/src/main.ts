import { assert } from 'testing/asserts';
import { info, warning } from 'log';
import { serveListener } from 'http/server';

import { env } from './env.ts';
import { handle } from './router.ts';

const controller = new AbortController();
Deno.addSignalListener('SIGINT', () => controller.abort());

const listener = Deno.listen({ port: env.PORT });
assert(listener.addr.transport === 'tcp');

info(`[META] initialized at ${listener.addr.hostname}:${listener.addr.port}`);
await serveListener(listener, handle, controller);
warning('[META] Closed');
