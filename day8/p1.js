import load from '../util/load.js';
export default undefined;

import Computer from './cpu.js';

const input = load(8).lines;

const cpu = new Computer(input);
cpu.run();
console.log(cpu.acc);