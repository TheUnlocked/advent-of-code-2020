import load from '../util/load.js';

const input = load(11).grid;

function statesEq(a, b) {
    if (a === null || b === null) return false;
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }
    return true;
}

let lastState = null;
let thisState = input;
do {
    const neighbors = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill(0));
    for (let r = 0; r < thisState.length; r++) {
        for (let c = 0; c < thisState[0].length; c++) {
            if (thisState[r][c] === '#') {
                for (let _i = -1; _i < 2; _i++) {
                    for (let _j = -1; _j < 2; _j++) {
                        if (_i === 0 && _j === 0) continue;

                        let i = _i;
                        let j = _j;
                        while (true) {
                            if (i + r < 0 || i + r >= input.length || j + c < 0 || j + c >= input[0].length) {
                                break;
                            }
                            if (thisState[i+r][j+c] !== '.') {
                                neighbors[i+r][j+c]++;
                                break;
                            }
                            else {
                                i += _i;
                                j += _j
                            }
                        }
                    }
                }
            }
        }
    }
    lastState = thisState;
    thisState = neighbors.map((a, r) => a.map((v, c) => {
        if (v === 0 && lastState[r][c]  === 'L') return '#';
        if (v >= 5 && lastState[r][c]  === '#') return 'L';
        return lastState[r][c];
    }));
} while (!statesEq(thisState, lastState))

console.log(
    thisState.reduce((result, next) => result + next.reduce(
        (result, next) => result + (next === '#' ? 1 : 0),
        0),
    0)
);