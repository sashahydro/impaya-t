import randomInt from '../utils/random-int';
import dateCreator from '../utils/date-creator';
import getId from '../utils/getId';
import copy from '../utils/copy';


/* CURRENCIES */
export enum CurrencyKey {
    EUR = 'eur',
    RUB = 'rub',
    USD = 'usd'
};

const currencies: Currency[] = [
    {
        id: getId('cur'),
        key: CurrencyKey.EUR,
        sign_unicode: '\u20ac'
    },
    {
        id: getId('cur'),
        key: CurrencyKey.RUB,
        sign_unicode: '\u20bd',
    },
    {
        id: getId('cur'),
        key: CurrencyKey.USD,
        sign_unicode: '\u0024',
    }
];

const currenciesL = currencies.length;




/* CARDS */
const cards: Card[] = [
    {
        id: getId('card'),
        card_expire: null,
        card_holder: null,
        card_number: '1334',
        system: 'MasterCard'
    },
    {
        id: getId('card'),
        card_expire: null,
        card_holder: null,
        card_number: '5776',
        system: 'Visa'
    }
];




/* TRANSACTIONS */
const getTransactionDate = dateCreator(new Date(2020, 0, 1), 3, 15);

function createTransaction(): Transaction {
    return {
        id: getId('ta'),
        date: getTransactionDate(),
        operation: (['income', 'expense'] as const)[randomInt(0, 1)],
        amount: (Math.random() * 10000).toFixed(2),
        currency_id: currencies[randomInt(0, currenciesL - 1)].id
    };
}

const transactions: Transaction[] = Array.from({ length: 100 }, createTransaction);




/* WALLETS */
const wallets: Wallet[] = [
    {
        id: getId('wal'),
        balance: '180322.42',
        currency: copy(currencies[0]),
        title: 'Кошелек #1'
    },
    {
        id: getId('wal'),
        balance: '22333322.42',
        currency: copy(currencies[2]),
        title: 'Кошелек #2'
    }
];




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

export type ApiDataKeys = keyof typeof data;

export default data;
