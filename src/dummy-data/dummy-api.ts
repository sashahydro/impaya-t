import randomInt from '../utils/random-int';
import data from './data';
import { DBUnit } from './types';

type Paths = keyof typeof data;

export default class API {
    async read<T extends DBUnit>(path: Paths): Promise<T> {
        const resp = await fetch(`./data/${path}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json() as Promise<T>;
    }

    async create<T extends DBUnit>(path: Paths, payload: T[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!data[path]) {
                    reject(`API.create: Invalid path ${path}`);
                }

                if (!payload || !payload.length) {
                    reject(`API.create(${path}): Empty request payload`);
                }

                resolve(payload);
            }, randomInt(30, 60));
        })
    }
}
