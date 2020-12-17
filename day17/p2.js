import load from '../util/load.js';
export default undefined;

const input = load(17).grid;

const size = 30;
const halfSize = size / 2;

let grid = new Array(size).fill(0).map(x => new Array(size).fill(0).map(x => new Array(size).fill(0).map(x => new Array(size).fill('.'))));

function clone(grid) {
    return grid.map(x => x.map(x => x.map(x => x.map(x => x))));
}

input.forEach((a, x) => a.forEach((v, y) => grid[x + halfSize][y + halfSize][halfSize][halfSize] = v));

for (let iter = 0; iter < 6; iter++) {
    const newGrid = clone(grid);

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                for (let w = 0; w < size; w++) {
                    let neighbors = 0;
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            for (let k = -1; k < 2; k++) {
                                for (let l = -1; l < 2; l++) {
                                    if (i === 0 && j === 0 && k === 0 && l === 0) continue;
                                    const val = grid?.[i + x]?.[j + y]?.[k + z]?.[l + w];
                                    if (val === '#') neighbors++;
                                }
                            }
                        }
                    }
                    if (grid[x][y][z][w] === '#') {
                        if (neighbors !== 2 && neighbors !== 3) {
                            newGrid[x][y][z][w] = '.';
                        }
                    }
                    else {
                        if (neighbors === 3) {
                            newGrid[x][y][z][w] = '#';
                        }
                    }
                }
            }
        }
    }

    grid = newGrid;
}

console.log(grid.reduce((a, b) => a + b.reduce((a, b) => a + b.reduce((a, b) => a + b.reduce((a, b) => a + (b === '#' ? 1 : 0), 0), 0), 0), 0));