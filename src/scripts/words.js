export const ABC_FREQ = {
    e: 11.1607, a: 8.4966, r: 7.5809, i: 7.5448,
    o: 7.1635, t: 6.9509, n: 6.6544, s: 5.7351,
    l: 5.4893, c: 4.5388, u: 3.6308, d: 3.3844,
    p: 3.1671, m: 3.0129, h: 3.0034, g: 2.4705,
    b: 2.0720, f: 1.8121, y: 1.7779, w: 1.2899,
    k: 1.1016, v: 1.0074, x: 0.2902, z: 0.2722,
    j: 0.1965, q: 0.1962
};

export const LETTER_SCORES = {
    '1': ['E', 'A', 'I', 'O', 'N', 'R', 'T', 'L', 'S', 'U'],
    '2': ['D', 'G'],
    '3': ['B', 'C', 'M', 'P'],
    '4': ['F', 'H', 'V', 'W', 'Y'],
    '5': ['K'],
    '8': ['J', 'X'],
    '10': ['Q', 'Z']
}

export function createFreqArray() {
    // find the constant that sets q, the smallest value, to 1
    const k = 1 / ABC_FREQ.q;
    let letters = [];

    // now multiply each letter in the array by timesing its frequency % by k.
    Object.entries(ABC_FREQ).forEach(([letter, freq]) => {
        letters = letters.concat(letter.repeat(freq * k).split(''));
    });
    return letters;
}