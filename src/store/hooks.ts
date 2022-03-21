import { TypedUseSelectorHook, useDispatch as useDispatchOriginal, useSelector as useSelectorOriginal } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useDispatch = () => useDispatchOriginal<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal;
