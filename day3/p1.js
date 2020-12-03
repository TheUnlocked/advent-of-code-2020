import load from '../util/load.js';
export default undefined;

const grid = load(3).grid.deepMap(x => x === '#');

let y = 0;
let x = 0;
let trees = 0;

while (y < grid.length) {
    if (grid[y][x]) trees++;
    x = (x + 3) % grid[0].length;
    y++;
}
console.log(trees);