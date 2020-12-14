import load from '../util/load.js';
export default undefined;

import { UInt64 } from 'int64_t';

const input = load(14).lines;

const mem = {};

let mask;

for (const line of input) {
    if (line.startsWith('mask')) {
        mask = line.slice(7);
    }
    else {
        const [_, addr, valStr] = line.match(/mem\[(\d+)\] = (\d+)/);
        let val = new UInt64(+valStr);
        for (const [char, index] of mask.split('').reverse().map((c, i) => [c, i])) {
            if (char === '0') {
                val = val.and(new UInt64(-1).xor(new UInt64(1).shiftLeft(index)));
            }
            else if (char === '1') {
                val = val.or(new UInt64(1).shiftLeft(index));
            }
        }
        mem[addr] = val;
    }
}

let sum = new UInt64(0);
for (const addr in mem) {
    sum = sum.add(mem[addr]);
}

console.log(sum.toString());