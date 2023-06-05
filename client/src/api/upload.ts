import { StatusCodes } from 'http-status-codes';
import { ClassificationSchema } from '../models/Classification.ts';

export async function upload(body: File) {
    const res = await fetch('/', { method: 'POST', body });
    switch (res.status) {
        case StatusCodes.OK: return ClassificationSchema.parse(await res.json());
        case StatusCodes.SERVICE_UNAVAILABLE: return null;
        default: throw new Error(`unexpected status code ${res.status}`);
    }
}
