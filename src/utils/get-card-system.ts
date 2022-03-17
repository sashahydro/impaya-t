const matchCardArr: [system: string, matchExp: RegExp][] = [
    ['visa', /^4/],
    ['unionpay', /^62/],
    ['mir', /^220[0-4]/],
    ['mastercard', /^(5[1-5])|^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/],
];


/**
 * Checks for card number first digits sequence (Issuer identification number)
 * to determine one of payment card systems (Visa, Mastercard, Mir and UnionPay):
 * @param {string}   input   Card number
 * @returns {string|null}   Detected system or null
 */
export default function getCardSystemByINN(input: string): string | null {
    input = input.trim();

    const l = input.length;
    const isNum = /^\d+$/.test(input);

    if (!l || !isNum) return null;

    for (let i = 0; i < matchCardArr.length; i++) {
        if (matchCardArr[i][1].test(input)) {
            return matchCardArr[i][0];
        }
    }

    return null;
}
