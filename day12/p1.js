import load from '../util/load.js';
export default undefined;

const input = load(12).lines;

let x = 0;
let y = 0;
let currentDir = 'E';

const turnRight = {
    'E': 'S',
    'S': 'W',
    'W': 'N',
    'N': 'E'
};

const turnLeft = {
    'E': 'N',
    'N': 'W',
    'W': 'S',
    'S': 'E'
};

for (const line of input) {
    let dir = line.slice(0,1);
    const dist = +line.slice(1);

    if (dir === 'F') dir = currentDir;

    switch (dir) {
        case 'N': y += dist; break;
        case 'S': y -= dist; break;
        case 'E': x += dist; break;
        case 'W': x -= dist; break;
        case 'L':
            for (let i = 0; i < dist / 90; i++) {
                currentDir = turnLeft[currentDir];
            }
            break;
        case 'R':
            for (let i = 0; i < dist / 90; i++) {
                currentDir = turnRight[currentDir];
            }
            break;
    }
}

console.log(Math.abs(x) + Math.abs(y));