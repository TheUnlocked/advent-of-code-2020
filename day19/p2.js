import load from '../util/load.js';
export default undefined;

const [_rules, _messages] = load(19).split();

const rules = Object.fromEntries(_rules.map(x => {
    const [label, values] = x.split(': ');
    return [label, values.split(' | ').map(x => x.split(" "))];
}));

rules[8] = [['42'], ['42', '8']];
rules[11] = [['42', '31'], ['42', '11', '31']];

// Turns out we can set an upper limit on the recursion depth and it will work for this problem.
// This is of course much easier to implement than actual support for a recursive grammar.
function genRegexp(ruleNumber, maxDepth) {
    if (maxDepth < 0) return "";
    const opts = rules[ruleNumber];
    if (opts[0][0].startsWith('"')) {
        return opts[0][0].slice(1, 2);
    }
    return "(?:" + opts.map(x => x.map(x => genRegexp(x, maxDepth - 1)).join("")).join('|') + ")";
}

// Dividing the max input length by 4 is probably safe, and it saves a bit of time.
// If it doesn't work, just delete the division.
const regexp = new RegExp("^" + genRegexp(0, Math.max(..._messages.map(x => x.length)) / 4) + "$");

console.log(_messages.filter(x => regexp.test(x)).length);