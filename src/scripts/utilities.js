export const random = (max, min=0) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export function arrayShuffle(array) {
    const random = (len) => Math.floor(Math.random() * len);
    const result = array;
    let counter = array.length;
    while (counter > 0) {
        const index = random(counter);
        counter--;
        const temp = result[counter];
        result[counter] = result[index];
        result[index] = temp;
    }
    return result;
}