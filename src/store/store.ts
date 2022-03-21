import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './features/cards';
import walletsReducer from './features/wallets';
import currenciesReducer from './features/currencies';

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        currencies: currenciesReducer,
        wallets: walletsReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://react-redux.js.org/tutorials/quick-start