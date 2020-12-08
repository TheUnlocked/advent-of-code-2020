import load from '../util/load.js';
export default undefined;

import Computer from './cpu.js';

const input = load(8).lines;

let change = 0;

while (true) {
    const original = input[change];
    switch (original.slice(0, 3)) {
        case 'nop':
            input[change] = "jmp" + original.slice(3);
            break;
        case 'jmp':
            input[change] = "nop" + original.slice(3);
            break;
        default:
            change++;
            continue;
    }

    const cpu = new Computer(input);
    if (cpu.run() === 'terminate') {
        console.log(cpu.acc);
        break;
    }

    input[change] = original;
    change++;
}