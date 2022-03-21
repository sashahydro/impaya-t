import createFeature from './create-feature';


const cardsFtr = createFeature<Card>('cards');


export const {
    createFn: createCard,
    readFn: getCards
} = cardsFtr;


export default cardsFtr.slice.reducer;
