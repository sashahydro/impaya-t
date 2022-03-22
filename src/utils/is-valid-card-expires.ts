export default function isValidCardExpiresDate(mm: string, yy: string): boolean {
    const month = +mm;
    const yearFull = +yy + 2000; // let's assume that anyone who holds 90's card won't use it, right?

    if (Number.isNaN(month) || (month > 12 || month < 1) || Number.isNaN(yearFull)) return false;

    const now = Date.now();

    return new Date(yearFull, month - 1, 1).getTime() > now;
}
