import load from '../util/load.js';
export default undefined;

const input = load(7).lines;

const rules = input.map(x => {
    const rule = {};
    const [bagName, list] = x.split(" bags contain ");
    if (list === "no other bags.") {
        return {
            type: bagName,
            contents: []
        };
    }
    const innerbags = list.split(", ");
    rule.type = bagName;
    rule.contents = innerbags.map(x => {
        const [_, num, type] = x.match(/(\d+) (.+) bags?\.?/)
        return {
            num: +num,
            type
        };
    });
    return rule;
});

const bagTypes = rules.map(x => x.type).filter((x, i, a) => a.indexOf(x) === i);

const rulesForType = Object.fromEntries(bagTypes.map(x => [x, rules.find(r => r.type == x)]));

let reachesGold = 0;

for (const type of bagTypes) {
    function searchForGold(type) {
        if (rulesForType[type].contents.length == 0) return 0;
        else if (rulesForType[type].contents.find(x => x.type === 'shiny gold')) return true;
        else return rulesForType[type].contents.some(x => searchForGold(x.type));
    }
    reachesGold += searchForGold(type) ? 1 : 0;
}

console.log(reachesGold);