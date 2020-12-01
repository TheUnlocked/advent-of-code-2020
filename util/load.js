import fs from 'fs';

export default function load(dayNumber) {
    return fs.readFileSync(new URL(`../inputs/day${dayNumber}`, import.meta.url), {
        encoding: 'utf8'
    });
}