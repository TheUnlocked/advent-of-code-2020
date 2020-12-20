import load from '../util/load.js';
export default undefined;

const input = load(20).split();

const tiles = input.map(([title, ...grid]) => [+title.slice(5, 9), grid.map(x => x.split(""))]);

export const tileSize = tiles[0][1].length
export const size = Math.sqrt(tiles.length);

function arrEq(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return !arr1.some((x, i) => arr2[i] !== x);
}

function fitTile(grid, remainingTiles, x, y) {
    if (remainingTiles.length === 0) return grid;

    const leftNeighbor = grid[x - 1]?.[y][1].map(x => x[tileSize - 1]);
    const topNeighbor = grid[x][y - 1]?.[1][tileSize - 1];
    for (const tile of remainingTiles) {
        let le = tile[1].map(x => x[0]);
        let be = tile[1][tileSize - 1].map(x => x);
        let re = tile[1].map(x => x[tileSize - 1]);
        let te = tile[1][0].map(x => x);
        let fle = le.map((_, i) => le[tileSize - i - 1]);
        let fre = re.map((_, i) => re[tileSize - i - 1]);
        let fbe = be.map((_, i) => be[tileSize - i - 1]);
        let fte = te.map((_, i) => te[tileSize - i - 1]);

        for (let orientation = 0; orientation < 8; orientation++) {
            let transformedEdges, newTile;
            switch (orientation) {
                case 0:
                    transformedEdges = {le: le, be: be, re: re, te: te};
                    newTile = tile[1];
                    break;
                case 1:
                    transformedEdges = {le: fte, be: le, re: fbe, te: re};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][c][tileSize - r - 1]));
                    break;
                case 2:
                    transformedEdges = {le: fre, be: fte, re: fle, te: fbe};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][tileSize - r - 1][tileSize - c - 1]));
                    break;
                case 3:
                    transformedEdges = {le: be, be: fre, re: te, te: fle};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][tileSize - c - 1][r]));
                    break;
                case 4:
                    transformedEdges = {le: fle, be: te, re: fre, te: be};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][tileSize - r - 1][c]));
                    break;
                case 5:
                    transformedEdges = {le: fbe, be: fle, re: fte, te: fre};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][tileSize - c - 1][tileSize - r - 1]));
                    break;
                case 6:
                    transformedEdges = {le: re, be: fbe, re: le, te: fte};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][r][tileSize - c - 1]));
                    break;
                case 7:
                    transformedEdges = {le: te, be: re, re: be, te: le};
                    newTile = tile[1].map((a, r) => a.map((_, c) => tile[1][c][r]));
                    break;
            }

            if ((leftNeighbor != null && !arrEq(transformedEdges.le, leftNeighbor)) || (topNeighbor != null && !arrEq(transformedEdges.te, topNeighbor))) {
                continue;
            }

            const newGrid = grid.map(x => x.map(x => x));

            newGrid[x][y] = [tile[0], newTile]
            
            const fitted = fitTile(
                newGrid,
                remainingTiles.filter(x => x !== tile),
                (x + 1) % size,
                y + (x + 1 === size ? 1 : 0)
            );
            if (fitted) {
                return fitted;
            }
        }
    }
    return false;
}

export function solveImageGrid() {
    return fitTile(new Array(size).fill(0).map(x => new Array(size).fill(null)), tiles, 0, 0);
}

const finalGrid = solveImageGrid();

console.log(finalGrid[0][0][0] * finalGrid[0][size - 1][0] * finalGrid[size - 1][size - 1][0] * finalGrid[size - 1][0][0]);