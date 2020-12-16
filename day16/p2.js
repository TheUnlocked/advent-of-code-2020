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

const validTix = [];

validTop:
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
            continue validTop;
        }
    }
    validTix.push(ticket);
}

const fieldVals = new Array(myTicket.length).fill(0).map((x, i) => validTix.map(t => t[i]));

const validFields = new Array(myTicket.length).fill(0).map(() => []);

for (let f = 0; f < fieldVals.length; f++) {
    ruleLoop:
    for (let r = 0; r < rules.length; r++) {
        for (const val of fieldVals[f]) {
            let valid = false;
            for (const range of rules[r]) {
                if (clamp(range[0], range[1], val) === val) {
                    valid = true;
                    break;
                }
            }
            if (!valid) continue ruleLoop;
        }
        validFields[f].push(r);
    }
}

const assigments = new Array(validFields.length).fill(-1);

while (assigments.filter(x => x !== -1).length < validFields.length) {
    const nextToAssign = validFields.findIndex(x => x.length === 1);
    assigments[nextToAssign] = validFields[nextToAssign][0];
    validFields.forEach(x => {
        const i = x.indexOf(assigments[nextToAssign]);
        if (i >= 0) x.splice(i, 1);
    });
}

console.log(assigments
    .map((x, i) => [myTicket[i], notesStrs[x]])
    .filter(([_, s]) => s.startsWith('departure'))
    .map(x => x[0])
    .reduce((a, b) => a * b, 1));