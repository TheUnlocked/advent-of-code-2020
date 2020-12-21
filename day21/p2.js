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


const allergens = Object.keys(allergenMapping);
const completedAllergens = new Set();
while (completedAllergens.size < allergens.length) {
    const nextAllergen = allergens.find(x => !completedAllergens.has(x) && allergenMapping[x].size === 1);
    if (!nextAllergen) break;
    for (const allergen of allergens) {
        if (allergen === nextAllergen) continue;
        for (const ingredient of allergenMapping[nextAllergen]) {
            allergenMapping[allergen].delete(ingredient);
        }
    }
    completedAllergens.add(nextAllergen);
}

const allergenList = Object.keys(allergenMapping).sort().map(x => [...allergenMapping[x]][0]);

console.log(allergenList.join(','));
