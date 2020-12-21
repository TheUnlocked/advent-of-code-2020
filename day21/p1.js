import load from '../util/load.js';
export default undefined;

const input = load(21).lines;

/** @type {{[a: string]: Set}} */
const allergenMapping = {};

const ingredientsSet = new Set();

/** @type {{[a: string]: number}} */
const ingredientCount = {};

const foods = input.map(line => {
    const [_, ingredientsStr, allergensStr] = line.match(/(.*?) \(contains (.*?)\)/);
    const ingredients = ingredientsStr.split(' ');
    const allergens = allergensStr.split(', ')
    ingredients.forEach(x => {
        ingredientCount[x] ??= 0;
        ingredientCount[x]++;
        ingredientsSet.add(x);
    });
    allergens.forEach(a => {
        const allergenSet = new Set(ingredients);
        allergenMapping[a] ??= new Set(ingredients);
        // Intersection
        allergenMapping[a] = new Set([...allergenMapping[a]].filter(x => allergenSet.has(x)));
    });
    return {
        ingredients,
        allergens
    }
});

const possibleAllergens = new Set([].concat(...Object.values(allergenMapping).map(x => [...x])));

const impossibleAllergens = [...ingredientsSet].filter(x => !possibleAllergens.has(x));

console.log(impossibleAllergens.reduce((result, next) => result + ingredientCount[next], 0));