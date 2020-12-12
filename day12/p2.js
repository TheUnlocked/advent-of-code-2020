import load from '../util/load.js';
export default undefined;

const input = load(12).lines;

let sx = 0;
let sy = 0;

let x = 10;
let y = 1;

for (const line of input) {
    const dir = line.slice(0,1);
    const dist = +line.slice(1);

    switch (dir) {
        case 'N': y += dist; break;
        case 'S': y -= dist; break;
        case 'E': x += dist; break;
        case 'W': x -= dist; break;
        case 'L':
            for (let i = 0; i < dist / 90; i++) {
                let tmp = x;
                x = -y;
                y = tmp;
            }
            break;
        case 'R':
            for (let i = 0; i < dist / 90; i++) {
                let tmp = x;
                x = y;
                y = -tmp;
            }
            break;
        case 'F':
            sx += x * dist;
            sy += y * dist;
            break;
    }
}

console.log(Math.abs(sx) + Math.abs(sy));