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

let grid = {};

function toGrid(address) {
    return address.join(',');
}

function fromGrid(g) {
    return g.split(',').map(x => +x);
}

function getNeighborsCt([x, y]) {
    let total = 0;
    if (grid[toGrid([x + 1, y])]) total++;
    if (grid[toGrid([x - 1, y])]) total++;
    if (grid[toGrid([x + 0.5, y + 1])]) total++;
    if (grid[toGrid([x - 0.5, y + 1])]) total++;
    if (grid[toGrid([x + 0.5, y - 1])]) total++;
    if (grid[toGrid([x - 0.5, y - 1])]) total++;
    return total;
}

function getSpotsToCheck() {
    const toCheck = new Set();
    for (const g in grid) {
        if (grid[g]) {
            const [x, y] = fromGrid(g);
            toCheck.add([x + 1, y]);
            toCheck.add([x - 1, y]);
            toCheck.add([x + 0.5, y + 1]);
            toCheck.add([x - 0.5, y + 1]);
            toCheck.add([x + 0.5, y - 1]);
            toCheck.add([x - 0.5, y - 1]);
        }
    }
    return toCheck;
}

for (const line of input) {
    grid[toGrid(getTileAddress(parseLine(line)))] = !grid[toGrid(getTileAddress(parseLine(line)))];
}

for (let i = 0; i < 100; i++) {
    const toCheck = getSpotsToCheck();

    const newGrid = {};
    for (const spot of toCheck) {
        const neighbors = getNeighborsCt(spot);
        if (grid[toGrid(spot)]) {
            if (neighbors === 1 || neighbors === 2) {
                newGrid[toGrid(spot)] = true;
            }
        }
        else {
            if (neighbors === 2) {
                newGrid[toGrid(spot)] = true;
            }
        }
    }

    grid = newGrid;
}

let sum = 0;
for (const pos in grid) {
    if (grid[pos]) sum++;
}

console.log(sum);