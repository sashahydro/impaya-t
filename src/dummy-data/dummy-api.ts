import randomInt from '../utils/random-int';
import data from './data';
import { DBUnit } from './types';

type Paths = keyof typeof data;

class API {
    async read<T extends DBUnit>(path: Paths): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (!data[path]) {
                reject(`API.read: Invalid path ${path}`);
            }

            resolve((data[path] as unknown) as T[]);
        });
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

const api = new API();

export default api;
