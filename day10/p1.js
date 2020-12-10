import load from '../util/load.js';

const input = load(10).nums;

input.push(0, Math.max.apply(null, input) + 3);

input.sort((a,b) => a-b);

let ones = 0;
let threes = 0;
for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] - input[i] === 1) ones++;
    if (input[i + 1] - input[i] === 3) threes++;
}

console.log(ones * threes);