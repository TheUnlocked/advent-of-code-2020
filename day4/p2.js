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

console.log(passports.filter(x => {
    if (!['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(k => k in x)) return false;

    if (/^[0-9]+cm$/.test(x.hgt)) {
        const height = +x.hgt.slice(0, x.hgt.length - 2);
        if (height < 150 || height > 193) return false;
    }
    else if (/^[0-9]+in$/.test(x.hgt)) {
        const height = +x.hgt.slice(0, x.hgt.length - 2);
        if (height < 59 || height > 76) return false;
    }
    else return false;

    return /^[0-9]{4}$/.test(x.byr) && +x.byr >= 1920 && +x.byr <= 2002 &&
        /^[0-9]{4}$/.test(x.iyr) && +x.iyr >= 2010 && +x.iyr <= 2020 &&
        /^[0-9]{4}$/.test(x.eyr) && +x.eyr >= 2020 && +x.eyr <= 2030 &&
        /^#[0-9a-f]{6}$/.test(x.hcl) &&
        /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(x.ecl) &&
        /^[0-9]{9}$/.test(x.pid)
}).length);