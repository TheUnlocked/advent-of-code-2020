import load from '../util/load.js';
export default undefined;

import Computer from './cpu.js';

const input = load(8).lines;

const mainCpu = new Computer(input);
mainCpu.run();

let change = 0;
let skipped = 0;

while (change < input.length) {
    const original = input[change];
    
    const {op, value} = mainCpu.parseInstruction(original);
    const shift = op === 'jmp' ? 1 : value;
    if (!['jmp', 'nop'].includes(op) || !mainCpu.visited[change] || (mainCpu.visited[change + shift] ?? Infinity) < mainCpu.visited[change]) {
        skipped++;
        change++;
        continue;
    }

    input[change] = {op: op === 'jmp' ? 'nop' : 'jmp', value};

    const cpu = new Computer(input);
    if (cpu.run() === 'terminate') {
        console.log(cpu.acc);
        break;
    }

    input[change] = original;
    change++;
}


console.log(`Skipped ${skipped}/${input.length} (${(100 * skipped / input.length).toPrecision(3)}%) instructions`);