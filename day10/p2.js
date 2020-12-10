import load from '../util/load.js';

const input = load(10).nums;

input.push(0, Math.max.apply(null, input) + 3);

input.sort((a,b) => a-b);

const waysToGet = input.map((_, i) => i === 0 ? 1 : 0);
for (let i = 0; i < input.length; i++) {
    for (let j = 1; j <= 3; j++) {
        if (input[i + j] - input[i] <= 3) waysToGet[i + j] += waysToGet[i];
    }
}

console.log(waysToGet[waysToGet.length - 1]);