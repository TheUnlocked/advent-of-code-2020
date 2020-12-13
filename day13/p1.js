import load from '../util/load.js';
export default undefined;

const [start, busIdsRaw] = load(13).lines;

const busIds = busIdsRaw.split(',').filter(x => x !== 'x').map(x => +x);


let earliest;
let earliestTime = Infinity;
for (const bus of busIds) {
    const t = Math.ceil(start / bus) * bus - start;
    if (t < earliestTime) {
        earliest = bus;
        earliestTime = t;
    }
}

console.log(earliest * earliestTime);