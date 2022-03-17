import randomInt from '../utils/random-int';
import dateCreator from '../utils/date-creator';
import {
    Card,
    Currency,
    Transaction,
    Wallet
} from './types';



/* CARDS */
const cards: Card[] = [
    {
        id: 1,
        card_expire: null,
        card_holder: null,
        card_number: '1334',
        currency_id: 1,
        system: 'Mastercard'
    },
    {
        id: 2,
        card_expire: null,
        card_holder: null,
        card_number: '5776',
        currency_id: 2,
        system: 'Visa'
    }
];




/* CURRENCIES */
export enum CurrencyKey {
    EUR = 'eur',
    RUB = 'rub',
    USD = 'usd'
};

const currencies: Currency[] = [
    {
        id: 1,
        key: CurrencyKey.EUR,
        sign_unicode: '\u20ac'
    },
    {
        id: 2,
        key: CurrencyKey.RUB,
        sign_unicode: '\u20bd',
    },
    {
        id: 3,
        key: CurrencyKey.USD,
        sign_unicode: '\u0024',
    }
];

const currenciesL = currencies.length;




/* TRANSACTIONS */
const getTransactionDate = dateCreator(new Date(2020, 0, 1), 3, 15);

function createTransaction(_: unknown, i: number): Transaction {
    return {
        id: i,
        date: getTransactionDate(),
        operation: (['income', 'expense'] as const)[randomInt(0, 1)],
        amount: (Math.random() * 10000).toFixed(2),
        currency_id: randomInt(1, currenciesL) // dirty
    };
}

const transactions: Transaction[] = Array.from({ length: 100 }, createTransaction);




/* WALLETS */
const wallets: Wallet[] = [];




const data: {
    wallets: Wallet[];
    cards: Card[];
    currencies: Currency[];
    transactions: Transaction[];
} = {
    wallets,
    cards,
    currencies,
    transactions
};

export default data;
