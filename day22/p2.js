import load from '../util/load.js';
export default undefined;

const input = load(22).split();

const decks = input.map(x => x.slice(1).map(x => +x).reverse());

const memo = {};

/** @type {(deck1: number[], deck2: number[]) => [1 | 2, number[]]} */
function performRound(deck1, deck2) {
    const pastRounds = new Set();

    const startingArrangement = deck1.join() + '|' + deck2.join();
    if (memo[startingArrangement]) {
        return memo[startingArrangement];
    }

    while (deck1.length > 0 && deck2.length > 0) {
        const arrangement = deck1.join() + '|' + deck2.join();
        if (pastRounds.has(arrangement)) {
            memo[arrangement] = [1, deck1];
            return [1, deck1];
        }
        else {
            pastRounds.add(arrangement);
        }
        if (memo[arrangement]) {
            return memo[arrangement];
        }

        const card1 = deck1.pop();
        const card2 = deck2.pop();
        if (card1 <= deck1.length && card2 <= deck2.length) {
            const winner = performRound(deck1.slice(deck1.length - card1), deck2.slice(deck2.length - card2))[0];
            if (winner === 1) {
                deck1 = [card2, card1, ...deck1];
            }
            else {
                deck2 = [card1, card2, ...deck2];
            }
        }
        else {
            if (card1 > card2) {
                deck1 = [card2, card1, ...deck1];
            }
            else {
                deck2 = [card1, card2, ...deck2];
            }
        }
    }
    if (deck1.length > 0) {
        memo[startingArrangement] = [1, deck1];
        return [1, deck1];
    }
    else {
        memo[startingArrangement] = [2, deck2];
        return [2, deck2];
    }
}

const winnerDeck = performRound(...decks);

console.log(winnerDeck[1].reduce((result, next, i) => result + next * (i + 1), 0));