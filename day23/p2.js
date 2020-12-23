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

const cupMapping = new Array(1000001).fill(false);

for (const v of input.split("")) {
    if (!first) {
        first = new LLNode(+v, null);
        end = first;
    }
    else {
        end.next = new LLNode(+v, null);
        end = end.next;
    }
    cupMapping[+v] = end;
}
for (let i = 10; i <= 1000000; i++) {
    end.next = new LLNode(i, null);
    end = end.next;
    cupMapping[i] = end;
}

end.next = first;

function takeThree() {
    const removed = first.next;
    let removedEnd = removed;
    for (let i = 0; i < 3 - 1; i++) {
        cupMapping[removedEnd.head] = false;
        removedEnd = removedEnd.next;
    }
    cupMapping[removedEnd.head] = false;
    first.next = removedEnd.next;
    removedEnd.next = null;
    return [removed, removedEnd];
}

function findWithValue(val) {
    return cupMapping[val];
}

for (let i = 0; i < 10000000; i++) {
    const [removed, removedEnd] = takeThree();
    let target = first.head - 1;
    let dest;
    while (true) {
        dest = findWithValue(target);
        if (dest) break;
        target--;
        if (target < 1) target = 1000000;
    }

    {
        let curr = removed;
        while (curr) {
            cupMapping[curr.head] = curr;
            curr = curr.next;
        }
    }

    removedEnd.next = dest.next;
    dest.next = removed;
    end = first;
    first = first.next;
}

let curr = findWithValue(1).next;
console.log(curr.head, curr.next.head, curr.head * curr.next.head);