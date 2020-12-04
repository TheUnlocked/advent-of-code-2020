import load from '../util/load.js';
export default undefined;

const input = load(4).lines;

const passports = [];
{
    let currentPassport = {};
    for (const line of input) {
        if (line == "") {
            passports.push(currentPassport);
            currentPassport = {};
        }
        else {
            line.split(' ').forEach(x => {
                const [key, val] = x.split(':');
                currentPassport[key] = val;
            });
        }
    }
    passports.push(currentPassport)
}

console.log(passports.filter(x => ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(k => k in x)).length);