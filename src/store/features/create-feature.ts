import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Draft } from 'immer/dist/internal';
import api from '../../dummy-data/dummy-api';
import { ApiDataKeys } from '../../dummy-data/data';



export default function createFeature<T extends DBUnit>(path: ApiDataKeys) {
    const initialState: {
        [key: string]: T;
    } = {};

    const getFn = createAsyncThunk(
        `${path}/get`,
        async () => {
            const items = await api.read<T>(path);

            return items;
        }
    );

    const createFn = createAsyncThunk(
        `${path}/create`,
        async (payload: Omit<T, 'id'>) => {
            const newItems = await api.create<T>(path, payload);

            return newItems;
        }
    );

    return {
        readFn: getFn,

        createFn: createFn,

        slice: createSlice({
            name: path,
            initialState,
            reducers: {},
            extraReducers: (builder) => {
                builder
                    .addCase(getFn.fulfilled, (state, action) => {
                        action.payload.forEach((item) => {
                            state[item.id] = item as Draft<T>;
                        });
                    })
                    .addCase(createFn.fulfilled, (state, action) => {
                        state[action.payload.id] = action.payload as Draft<T>;
                    });
            }
        })
    }
}