import load from '../util/load.js';
export default undefined;

const input = load(6).lines;

const groups = [];
{
    let group = [];
    for (const line of input) {
        if (line === "") {
            groups.push(group);
            group = []
        }
        else {
            group.push(line);
        }
    }
    if (group.length > 0) groups.push(group);
}

let sum = 0;
for (const group of groups) {
    const qs = {};
    for (const person of group) {
        for (const letter of person.split("")) {
            qs[letter] = qs[letter] ? qs[letter] + 1 : 1;
        }
    }
    let groupSum = 0;
    for (const l in qs) {
        if (qs[l] == group.length) groupSum++;
    }

    sum += groupSum;
}

console.log(sum);