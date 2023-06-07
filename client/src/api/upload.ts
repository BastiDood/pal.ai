import { StatusCodes } from 'http-status-codes';
import { LabelsRecordSchema } from '../models/Classification.ts';

export async function upload(body: Blob) {
    const res = await fetch('/', { method: 'POST', body });
    switch (res.status) {
        case StatusCodes.OK: return LabelsRecordSchema.parse(await res.json());
        case StatusCodes.SERVICE_UNAVAILABLE: return null;
        default: throw new Error(`unexpected status code ${res.status}`);
    }
}
