import load from '../util/load.js';
export default undefined;

// Install antlr4 v4.9 or later from https://www.antlr.org/download.html, then run:
// antlr4 -Dlanguage=JavaScript lang.g4 -visitor
// in this directory
import antlr4 from 'antlr4';
import langVisitor from './langVisitor.js';
import langLexer from './langLexer.js';
import langParser from './langParser.js';

const input = load(18).lines;

let sum = 0;

class Visitor extends langVisitor {
    visitExpr2(ctx) {
        if (ctx.expr2()) {
            return this.visitAdd(ctx.add()) * this.visitExpr2(ctx.expr2());
        }
        return this.visitAdd(ctx.add());
    }

    visitAdd(ctx) {
        if (ctx.add()) {
            return this.visitAtom2(ctx.atom2()) + this.visitAdd(ctx.add());
        }
        return this.visitAtom2(ctx.atom2());
    }

    visitAtom2(ctx) {
        if (ctx.NUMBER()) {
            return +ctx.NUMBER().getText();
        }
        return this.visitExpr2(ctx.expr2());
    }
}

for (const line of input) {
    const chars = new antlr4.InputStream(line);
    const lexer = new langLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new langParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.expr2();
    
    sum += tree.accept(new Visitor());
}

console.log(sum);