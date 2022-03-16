import data from './data';
import { DBUnit } from './types';


export default class API {
    read<T extends DBUnit>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            data.cards.push({});
        });
    }

    create<T extends DBUnit>(path: string, data: T[]): Promise<T> {
        return new Promise((resolve, reject) => {

        })
    }
}