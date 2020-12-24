import load from '../util/load.js';
export default undefined;

const input = load(24).lines;

/** @type {(line: string) => string[]} */
function parseLine(line) {
    const dirs = [];
    for (let i = 0; i < line.length; i++) {
        if (['s', 'n'].includes(line[i])) {
            dirs.push(line[i++] + line[i]);
        }
        else {
            dirs.push(line[i]);
        }
    }
    return dirs;
}

/** @type {(path: ('se' | 'sw' | 'ne' | 'nw' | 'e' | 'w')[]) => [number, number]} */
function getTileAddress(path) {
    let x = 0;
    let y = 0;
    for (const dir of path) {
        switch (dir) {
            case 'e': x += 1; break;
            case 'w': x -= 1; break;
            case 'se': y -= 1; x += 0.5; break;
            case 'sw': y -= 1; x -= 0.5; break;
            case 'ne': y += 1; x += 0.5; break;
            case 'nw': y += 1; x -= 0.5; break;
        }
    }
    return [x, y];
}


const grid = {};
for (const line of input) {
    grid[getTileAddress(parseLine(line)).join(',')] = !grid[getTileAddress(parseLine(line)).join(',')];
}

let sum = 0;
for (const pos in grid) {
    if (grid[pos]) sum++;
}

console.log(sum);