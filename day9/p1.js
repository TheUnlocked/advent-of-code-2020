import load from '../util/load.js';

const input = load(9).nums;

const preambleLength = 25;

export default function p1() {
    for (let o = preambleLength; o < input.length; o++) {
        let ok = false;
        for (let i = o - preambleLength; i < o; i++) {
            for (let j = i + 1; j < o; j++) {
                if (input[i] + input[j] === input[o]) {
                    ok = true;
                }
            }
        }
        if (!ok) {
            return input[o];
        }
    }
}

console.log(p1());