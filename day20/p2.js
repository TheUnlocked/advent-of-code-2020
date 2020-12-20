import { size as gridSize, tileSize, solveImageGrid } from './p1.js';
export default undefined;

const imageGrid = solveImageGrid();

const imageSize = gridSize * (tileSize - 2);

function generateImage(imageGrid) {
    const image = new Array(imageSize).fill(0).map(x => new Array(imageSize).fill(''));
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let r = 0; r < tileSize - 2; r++) {
                for (let c = 0; c < tileSize - 2; c++) {
                    image[y * (tileSize - 2) + r][x * (tileSize - 2) + c] = imageGrid[x][y][1][r + 1][c + 1];
                }
            }
        }
    }
    return image;
}

const image = generateImage(imageGrid);

const MONSTER =
`                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `
    .split("\n").map(x => x.split(""));

for (let orientation = 0; orientation < 8; orientation++) {
    let transformed;
    switch (orientation) {
        case 0:
            transformed = image.map(x => x.map(x => x));
            break;
        case 1:
            transformed = image.map((a, r) => a.map((_, c) => image[c][imageSize - r - 1]));
            break;
        case 2:
            transformed = image.map((a, r) => a.map((_, c) => image[imageSize - r - 1][imageSize - c - 1]));
            break;
        case 3:
            transformed = image.map((a, r) => a.map((_, c) => image[imageSize - c - 1][r]));
            break;
        case 4:
            transformed = image.map((a, r) => a.map((_, c) => image[imageSize - r - 1][c]));
            break;
        case 5:
            transformed = image.map((a, r) => a.map((_, c) => image[c][r]));
            break;
        case 6:
            transformed = image.map((a, r) => a.map((_, c) => image[r][imageSize - c - 1]));
            break;
        case 7:
            transformed = image.map((a, r) => a.map((_, c) => image[imageSize - c - 1][imageSize - r - 1]));
            break;
    }

    let foundMonster = false;
    for (let r = 0; r < imageSize - MONSTER.length; r++) {
        checkMonster:
        for (let c = 0; c < imageSize - MONSTER[0].length; c++) {
            for (let i = 0; i < MONSTER.length; i++) {
                for (let j = 0; j < MONSTER[0].length; j++) {
                    if (MONSTER[i][j] === '#') {
                        if (transformed[r + i][c + j] !== '#') {
                            continue checkMonster;
                        }
                    }
                }
            }
            foundMonster = true;
            for (let i = 0; i < MONSTER.length; i++) {
                for (let j = 0; j < MONSTER[0].length; j++) {
                    if (MONSTER[i][j] === '#') {
                        transformed[r + i][c + j] = 'O';
                    }
                }
            }
        }
    }

    if (foundMonster) {
        console.log("Part 2:", transformed.reduce((result, next) => result + next.reduce((result, next) => result + (next === '#' ? 1 : 0), 0), 0))
        break;
    }
}