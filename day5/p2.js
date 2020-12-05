import load from '../util/load.js';
export default undefined;

const input = load(5).lines;

const seats = [];
for (const line of input) {
    const fb = line.slice(0, 7);
    const lr = line.slice(7);

    let row = 0;
    for (const letter of fb.split('')) {
        row = (row << 1) | (letter == 'B' ? 1 : 0);
    }
    let col = 0;
    for (const letter of lr.split('')) {
        col = (col << 1) | (letter == 'R' ? 1 : 0);
    }

    const id = row * 8 + col;
    seats.push(id);
}
seats.sort((a, b) => a - b);

for (let i = 0; i < seats.length; i++) {
    if (seats[i] != seats[0] + i) {
        console.log(i + seats[0]);
        break;
    }
}