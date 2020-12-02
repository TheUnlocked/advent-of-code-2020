import load from '../util/load.js';
export default undefined;

const lines = load(2).split('\n').map(x => x.trim());

let valid = 0;
for (const line of lines) {
    const [policy, password] = line.split(": ");
    const [low, rest] = policy.split('-');
    const [high, char] = rest.split(' ');
    const occurrences = password.split('').filter(x => x === char).length;
    if (occurrences >= +low && occurrences <= +high) valid++;
}
console.log(valid);