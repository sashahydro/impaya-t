export interface DBUnit {
    id: number;
}

export interface Currency extends DBUnit {
    key: string;
    title: string;
    title_short: string;
    sign_unicode: string;
}

export interface Wallet extends DBUnit {
    balance: string;
    currency: Currency;
    title: string;
}

export interface Transaction extends DBUnit {
    date: string; // iso
    operation: 'income' | 'outcome';
    amount: string;
    currency: Currency;
}

export interface Card {
    
}