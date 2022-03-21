import createFeature from './create-feature';


const currencyFtr = createFeature<Currency>('currencies');


export const {
    readFn: getCurrencies
} = currencyFtr;


export default currencyFtr.slice.reducer;
