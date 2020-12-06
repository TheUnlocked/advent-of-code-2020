import load from '../util/load.js';
export default undefined;

const input = load(6).split();

let sum = 0;
for (const group of input) {
    const qs = {};
    for (const person of group) {
        for (const letter of person.split("")) {
            qs[letter] = 1;
        }
    }

    sum += Object.keys(qs).length;
}

console.log(sum);