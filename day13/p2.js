import load from '../util/load.js';
export default undefined;

// need to npm install; may not work on Windows (use WSL!)
import crt from 'nodejs-chinese-remainder';
import bignum from 'bignum';

const [_, busIdsRaw] = load(13).lines;

let buses = busIdsRaw.split(',')
    .map((x, i) => [x, i])
    .filter(x => x[0] !== 'x')
    .map(([x, i]) => [+x, i]);

const maxDelay = Math.max(...buses.map(x => x[1]));

let t = crt(buses.map(x => bignum(maxDelay - x[1])), buses.map(x => bignum(x[0]))) - maxDelay;

// debug:
// for (const [bus, delay] of buses) {
//     console.log(bus, delay, (t + delay) / bus);
// }

console.log(t.toString());
