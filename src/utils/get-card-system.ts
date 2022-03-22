const matchCardArr: [system: string, matchExp: RegExp][] = [
    ['Visa', /^4/],
    ['Unionpay', /^62/],
    ['Mir', /^220[0-4]/],
    ['MasterCard', /^(5[1-5])|^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/],
];


/**
 * Checks for card number first digits sequence (Issuer identification number)
 * to determine one of payment card systems (Visa, Mastercard, Mir and UnionPay):
 * @param {string}   input   Card number
 * @returns {string|null}   Detected system or null
 */
export default function getCardSystemByINN(input: string): string | null {
    input = input.replace(/[^\d]/g, '');

    const l = input.length;

    if (!l || isNaN(+input)) return null;

    for (let i = 0; i < matchCardArr.length; i++) {
        if (matchCardArr[i][1].test(input)) {
            return matchCardArr[i][0];
        }
    }

    return null;
}
