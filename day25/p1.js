import load from '../util/load.js';
export default undefined;

const [pub1Str, pub2Str] = load(25).lines;

const pub1 = +pub1Str;
const pub2 = +pub2Str;

function transformSubject(num, loops) {
    let val = 1;
    for (let i = 0; i < loops; i++) {
        val *= num;
        val %= 20201227;
    }
    return val;
}

let loops1 = 1;
let v1 = 1;
while (true) {
    v1 *= 7;
    v1 %= 20201227;
    if (v1 === pub1) {
        break;
    }
    loops1++;
}
let loops2 = 1;
let v2 = 1;
while (true) {
    v2 *= 7;
    v2 %= 20201227;
    if (v2 === pub2) {
        break;
    }
    loops2++;
}

console.log(transformSubject(pub1, loops2));