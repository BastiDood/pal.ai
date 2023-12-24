import { error, json } from '@sveltejs/kit';
import { Classifications } from '$lib/models/Classification';
import type { RequestHandler } from './$types';
import { assert } from '$lib/assert';
import { env } from '$env/dynamic/private';
import { parse } from 'valibot';

export const prerender = false;

// eslint-disable-next-line func-style
export const POST: RequestHandler = async ({ fetch, request }) => {
    assert(env.API_KEY, 'empty API key');
    const res = await fetch('https://api-inference.huggingface.co/models/jkrperson/Beit-for-rice-disease', {
        headers: { Authorization: `Bearer ${env.API_KEY}` },
        method: 'POST',
        body: request.body,
        // @ts-expect-error - This is an upstream error due to outdated types.
        duplex: 'half',
    });

    console.info('[POST] receiving request');
    const data = await res.json();
    switch (res.status) {
        case 200:
            break;
        case 503:
            console.warn(`[POST] model is still starting up ${JSON.stringify(data)}`);
            error(503);
        // falls through
        default:
            console.error(`[POST] unexpected status code ${res.status} ${JSON.stringify(data)}`);
            error(501);
    }

    console.info('[POST] successful upload to the model');
    return json(parse(Classifications, data), { status: 201 });
};
