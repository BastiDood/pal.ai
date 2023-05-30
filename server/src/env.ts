import { assert } from 'testing/asserts';

const API_KEY = Deno.env.get('API_KEY');
assert(API_KEY);

const PORT = Deno.env.get('PORT');
assert(PORT);

export const env = {
    API_KEY,
    PORT: parseInt(PORT, 10),
};
