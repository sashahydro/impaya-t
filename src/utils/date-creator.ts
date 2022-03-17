import randomInt from './random-int';

const DAY_MS = 86400000;

export default function dateCreator(from: Date, stepMin: number, stepMax: number): () => string {
    let step = 0;

    return function getRandomDate(): string {
        step += randomInt(stepMin, stepMax);

        return new Date(
            from.getTime() + (step * DAY_MS) + (Math.round(Math.random() * DAY_MS))
        ).toISOString()
    }
}
