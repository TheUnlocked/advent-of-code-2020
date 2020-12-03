import load from '../util/load.js';
export default undefined;

const lines = load(3).split('\n').map(x => x.trim());

const grid = lines.map(x => x.split('').map(x => x === '#'));

const slopes = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
];

let totalTrees = 1;
for (const slope of slopes) {
    let y = 0;
    let x = 0;
    let trees = 0;
    while (y < grid.length) {
        if (grid[y][x]) trees++;
        x = (x + slope[0]) % grid[0].length;
        y += slope[1];
    }
    totalTrees *= trees;
}
console.log(totalTrees);