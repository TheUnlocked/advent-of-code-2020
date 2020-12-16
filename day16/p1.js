import load from '../util/load.js';
export default undefined;

const [notesStrs, myTicketStrs, nearby] = load(16).split();

const rules = [];

for (const note of notesStrs) {
    const [type, vals] = note.split(":");
    const [_, f, s] = vals.match(/(\d+-\d+) or (\d+-\d+)/);
    rules.push([f.split('-').map(x => +x), s.split('-').map(x => +x)]);
}

const myTicket = myTicketStrs[1].split(',').map(x => +x);;

function clamp(low, high, v) {
    return Math.max(Math.min(v, high), low);
}

let errorSum = 0;

for (const ticketStr of nearby.slice(1)) {
    const ticket = ticketStr.split(',').map(x => +x);

    for (let i = 0; i < ticket.length; i++) {
        let anyEq = false;
        for (const rule of rules) {
            for (const range of rule) {
                if (anyEq || clamp(range[0], range[1], ticket[i]) === ticket[i]) {
                    anyEq = true;
                }
            }
        }
        if (!anyEq) {
            errorSum += ticket[i];
        }
    }
}

console.log(errorSum);