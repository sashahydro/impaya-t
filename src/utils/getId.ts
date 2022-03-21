export default function getId(prefix = 'i'): string {
    const rand = Math.random().toString(36);

    return `${prefix}_${rand.substr(2, rand.length - 2)}`;
}
