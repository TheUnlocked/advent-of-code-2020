import load from '../util/load.js';
export default undefined;

const input = load(23).raw;

class LLNode {
    head;
    next;
    constructor(head, next) {
        this.head = head;
        this.next = next;
    }
}

let first;
let end;

for (const v of input.split("")) {
    if (!first) {
        first = new LLNode(+v, null);
        end = first;
    }
    else {
        end.next = new LLNode(+v, null);
        end = end.next;
    }
}

end.next = first;

function takeThree() {
    const removed = first.next;
    let removedEnd = removed;
    for (let i = 0; i < 3 - 1; i++) removedEnd = removedEnd.next;
    first.next = removedEnd.next;
    removedEnd.next = null;
    return [removed, removedEnd];
}

function findWithValue(val) {
    let curr = first;
    do {
        if (curr.head === val) {
            return curr;
        }
        curr = curr.next;
    } while (curr !== first);
    return false;
}

for (let i = 0; i < 100; i++) {
    const [removed, removedEnd] = takeThree();
    let target = first.head - 1;
    let dest;
    while (true) {
        dest = findWithValue(target);
        if (dest) break;
        target--;
        if (target < 1) target = 9;
    }
    removedEnd.next = dest.next;
    dest.next = removed;
    end = first;
    first = first.next;
}

let outStr = "";
let curr = findWithValue(1).next;
while (curr.head !== 1) {
    outStr += curr.head;
    curr = curr.next;
}

console.log(outStr);