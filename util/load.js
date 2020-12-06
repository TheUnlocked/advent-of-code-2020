import fs from 'fs';

export default function load(dayNumber) {
    const str = fs.readFileSync(new URL(`../inputs/day${dayNumber}`, import.meta.url), {
        encoding: 'utf8'
    });
    
    let lines, grid, nums;
    const obj = {
        /** @type {string} */
        get raw() { return str; },
        /** @type {string[]} */
        get lines() { return lines ??= obj.raw.split(/\r\n|\n/); },
        /** @type {number[]} */
        get nums() { return nums ??= obj.lines.map(x => +x); },
        /** @type {string[][] & {deepMap<T>(f: (x: string) => T): T[][]}} */
        get grid() {
            return grid ??= (() => {
                function deepMap(f) {
                    const newGrid = this.map(x => x.map(x => f(x)));
                    newGrid.deepMap = deepMap;
                    return newGrid;
                }
                const grid = obj.lines.map(x => x.split(""));
                grid.deepMap = deepMap;
                return grid;
            })();
        },
        /** @type {(splitter?: string | ((line: string) => boolean)) => string[][]} */
        split(splitter = "") {
            if (typeof splitter === 'string') {
                const v = splitter;
                splitter = x => x === v;
            }
            const groups = [];
            let group = [];
            for (const line of obj.lines) {
                if (splitter(line)) {
                    groups.push(group);
                    group = []
                }
                else {
                    group.push(line);
                }
            }
            if (group.length > 0) groups.push(group);
            return groups;
        }
    };
    return obj;
}