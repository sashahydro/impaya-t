/* DATA TYPES */
interface DBUnit {
    id: string;
}

interface Currency extends DBUnit {
    key: string;
    title?: string;
    sign_unicode: string;
}

interface Card extends DBUnit {
    card_expire: string | null;
    card_holder: string | null;
    card_number: string | null;
    currency: Currency;
    system: 'Mastercard' | 'Visa';
    title: string;
}

interface Transaction extends DBUnit {
    date: string; // iso
    operation: 'income' | 'expense';
    amount: string;
    currency_id: string;
}

interface Wallet extends DBUnit {
    balance: string;
    currency: Currency;
    title: string;
}
