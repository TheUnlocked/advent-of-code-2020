export default class Computer {
    ptr;
    acc;
    instructions;

    visited;
    iteration;

    constructor(instructions = []) {
        this.instructions = instructions;
        this.ptr = 0;
        this.acc = 0;
        this.visited = {};
        this.iteration = 0;
    }

    run() {
        while (true) {
            const response = this.iterate();
            switch (response) {
                case 'terminate':
                case 'cycle':
                    return response;
            }
        }
    }

    iterate() {
        if (this.terminated) return 'terminate';
        if (this.inCycle) return 'cycle';

        this.visited[this.ptr] = this.iteration++;
        const didJump = this.execInstruction(this.instructions[this.ptr]);
        if (!didJump) this.ptr++;
        return 'ok';
    }

    get inCycle() {
        return this.visited[this.ptr] !== undefined;
    }

    get terminated() {
        return this.ptr < 0 || this.ptr >= this.instructions.length;
    }
    
    /** @type {(instruction: string | {op: string, value: number}) => boolean} */
    execInstruction(instruction) {
        const {op, value} = typeof instruction === 'string' ? this.parseInstruction(instruction) : instruction;
        return this[`op_${op}`](value);
    }

    parseInstruction(instruction) {
        const [op, val] = instruction.split(' ');
        const value = val[0] === '+' ? +val.slice(1) : -val.slice(1);
        return {op, value};
    }
    
    op_nop() {}
    /** @type {(arg: number) => boolean} */
    op_jmp(arg) {
        this.ptr += arg;
        return true;
    }
    /** @type {(arg: number) => void} */
    op_acc(arg) {
        this.acc += arg;
    }
}