import { Classifications } from '$lib/models/Classification';
import { parse } from 'valibot';

export async function upload(body: Blob) {
    const res = await fetch('/upload', { method: 'POST', body });
    switch (res.status) {
        case 201:
            return parse(Classifications, await res.json());
        case 503:
            return null;
        default:
            throw new Error(`unexpected status code ${res.status}`);
    }
}
