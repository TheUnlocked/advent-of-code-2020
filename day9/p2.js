import load from '../util/load.js';
export default undefined;

import p1 from './p1.js';

const input = load(9).nums;

const target = p1();

outer:
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const sum = input.slice(i, j).reduce((a,b) => a+b);
        if (sum > target) break;
        else if (sum === target) {
            const slice = input.slice(i, j);
            console.log(Math.max.apply(null, slice) + Math.min.apply(null, slice))
            break outer;
        }
    }
}