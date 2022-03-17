export interface DBUnit {
    id: number;
}

export interface Currency extends DBUnit {
    key: string;
    title?: string;
    sign_unicode: string;
}

export interface Wallet extends DBUnit {
    balance: string;
    currency_id: number;
    title: string;
}

export interface Transaction extends DBUnit {
    date: string; // iso
    operation: 'income' | 'expense';
    amount: string;
    currency_id: number;
}

export interface Card extends DBUnit {
    card_expire: string | null;
    card_holder: string | null;
    card_number: string | null;
    currency_id: number;
    system: 'Mastercard' | 'Visa';
}
