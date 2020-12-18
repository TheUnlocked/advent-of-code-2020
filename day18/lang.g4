grammar lang;

expr
    : expr op=(MUL | ADD) atom
    | atom
    ;

expr2
    : expr2 MUL add
    | add
    ;

add
    : add ADD atom2
    | atom2
    ;

atom
    : '(' expr ')'
    | NUMBER
    ;

atom2
    : '(' expr2 ')'
    | NUMBER
    ;

NUMBER: [0-9]+ ;
MUL: '*';
ADD: '+';

WS: ' ' -> skip;