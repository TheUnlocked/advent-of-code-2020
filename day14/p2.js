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
        const [_, addrStr, valStr] = line.match(/mem\[(\d+)\] = (\d+)/);
        let val = new UInt64(+valStr);
        let addrs = [new UInt64(+addrStr)];
        for (const [char, index] of mask.split('').reverse().map((c, i) => [c, i])) {
            let newAddrs = [];
            for (const addr of addrs) {
                if (char === '0') {
                    newAddrs.push(addr);
                }
                else if (char === '1') {
                    newAddrs.push(addr.or(new UInt64(1).shiftLeft(index)));
                }
                else {
                    newAddrs.push(addr.and(new UInt64(-1).xor(new UInt64(1).shiftLeft(index))));
                    newAddrs.push(addr.or(new UInt64(1).shiftLeft(index)));
                }
            }
            addrs = newAddrs;
        }
        for (const addr of addrs) {
            mem[addr.toString()] = val;
        }
    }
}

let sum = new UInt64(0);
for (const addr in mem) {
    sum = sum.add(mem[addr]);
}

console.log(sum.toString());