import load from '../util/load.js';
export default undefined;

const [_rules, _messages] = load(19).split();

const rules = Object.fromEntries(_rules.map(x => {
    const [label, values] = x.split(': ');
    return [label, values.split(' | ').map(x => x.split(" "))];
}));

function genRegexp(ruleNumber) {
    const opts = rules[ruleNumber];
    if (opts[0][0].startsWith('"')) {
        return opts[0][0].slice(1, 2);
    }
    return "(" + opts.map(x => x.map(x => genRegexp(x)).join("")).join('|') + ")";
}
console.log(genRegexp(0));
const regexp = new RegExp("^" + genRegexp(0) + "$");

console.log(_messages.filter(x => regexp.test(x)).length);