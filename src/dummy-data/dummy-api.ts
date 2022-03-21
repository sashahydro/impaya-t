import getId from '../utils/getId';
import randomInt from '../utils/random-int';
import data from './data';

type Paths = keyof typeof data;


class API {
    async read<T extends DBUnit>(path: Paths, opts?: {
        limit?: number;
        offset?: number;
    }): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (!data[path]) {
                reject(`API.read: Invalid path ${path}`);
            }

            const ref = (data[path] as unknown) as T[]; // meh

            let limit = opts?.limit || 10;
            let offset = opts?.offset || 0;

            resolve(ref.slice(offset, limit + offset));
        });
    }

    async create<T extends DBUnit>(path: Paths, payload: Omit<T, 'id'>): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!data[path]) {
                    reject(`API.create: Invalid path ${path}`);
                }

                if (!payload) {
                    reject(`API.create(${path}): Empty request payload`);
                }

                const copy: T = JSON.parse(JSON.stringify({
                    ...payload,
                    id: getId(path)
                }));

                resolve(copy);
            }, randomInt(30, 60));
        });
    }
}

const api = new API();

export default api;
