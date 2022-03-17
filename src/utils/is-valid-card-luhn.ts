const checkArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];



/**
 * Checks number by Luhn algorithm
 * @param {string}  input   paymentg card number
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @see https://gist.github.com/ShirtlessKirk/2134376
 */
export default function isValidCardLuhn(input: string): boolean {
    let len = input.length;
    let bit = 1;
    let sum = 0;
    let val: number;


    while (len) {
        val = parseInt(input.charAt(--len), 10);
        sum += (bit ^= 1) ? checkArr[val] : val;
    }

    return !!sum && sum % 10 === 0;
}
