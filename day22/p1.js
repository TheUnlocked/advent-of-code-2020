import load from '../util/load.js';
export default undefined;

const input = load(22).split();

const decks = input.map(x => x.slice(1).map(x => +x).reverse());

/** @type {(deck1: number[], deck2: number[]) => number[]} */
function performRound(deck1, deck2) {
    while (deck1.length > 0 && deck2.length > 0) {
        const card1 = deck1.pop();
        const card2 = deck2.pop();
        if (card1 > card2) {
            deck1 = [card2, card1, ...deck1];
        }
        else {
            deck2 = [card1, card2, ...deck2];
        }
    }
    if (deck1.length > 0) {
        return deck1;
    }
    else {
        return deck2;
    }
}

const winnerDeck = performRound(...decks);

console.log(winnerDeck.reduce((result, next, i) => result + next * (i + 1), 0));