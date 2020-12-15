import load from '../util/load.js';
export default undefined;

const input = load(15).raw.split(',');

let currentTurn = 1;
const lastSaid = new Array(30000000).fill(undefined);
let lastNum;

for (const num of input) {
    lastNum = +num;
    lastSaid[num] = currentTurn++;
}

for (; currentTurn <= 30000000; currentTurn++) {
    const ls = lastSaid[lastNum] ?? (currentTurn - 1);
    const newVal = currentTurn - ls - 1;
    lastSaid[lastNum] = currentTurn - 1;
    lastNum = newVal;
}

console.log(lastNum);