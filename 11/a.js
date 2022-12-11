// https://adventofcode.com/2022/day/11
import fs from 'fs'
// let text = fs.readFileSync('11\\test.txt', 'utf8').trim()
let text = fs.readFileSync('11\\input.txt', 'utf8').trim()
let monkeys = text.split('\r\n\r\n')

// parseing the monkeys
function makeMonkeyArray(monkeys) {
    return monkeys.map((m) => {
        let lines = m.split('\r\n')
        let obj = {}
        lines.forEach((line, i) => {        
            let [key, val] = line.trim().split(':')
            if(i == 0) obj['monkey'] = parseInt(key.substring(key.length - 1));
            if(i == 1) obj['start'] = val.split(', ').map((v) => parseInt(v))
            if(i == 2) obj['op'] = (old, og = val) => {
                let [op, val] = og.substring(11).split(" ");
                if(val == 'old') val = old;
                if(op === "*") return parseInt(old) * parseInt(val);
                if(op === "+") return parseInt(old) + parseInt(val);
            }
            if(i == 3) { obj['test'] = (test, og = val) => {
                // only grab digits
                let digits =  parseInt(og.replace(/\D/g,''));
                return test % digits === 0 ? true : false;
            }
            obj['div'] = parseInt(val.replace(/\D/g,''));
            return obj;        
        }
            if(i == 4) return obj['true'] = parseInt(val.substring(val.length - 1));
            if(i == 5) return obj['false'] = parseInt(val.substring(val.length - 1));
        })
        return obj
    });
}


function keepAway(monkeys, maxRounds, manageWorry = false) {
    let round = 0;
    // product of all divisors
    let mod = monkeys.reduce((a, b) => a * b.div, 1);
    while(round < maxRounds) {
        round++;
        for(let i = 0; i < monkeys.length; i++) {
            let monkey = monkeys.find((m) => m.monkey === i);
            let original = monkey.start.length;
            for(let i = 0; i < original; i++) {
                let start = monkey.start.shift();
                let worry = monkey.op(start);
                manageWorry ? worry = Math.floor(worry / 3) : worry = worry % mod;
                let passTo = monkey.test(worry) ? monkey.true : monkey.false;
                monkeys.find((m) => m.monkey === passTo).start.push(worry);
                monkey.inspected = monkey.inspected + 1 || 1;
            }
        }
        // testing
        // if(round === 1 || round === 20 || round === 1000) console.log(monkeys.map((m) => m.inspected))
    }
    monkeys.sort((a, b) => b.inspected - a.inspected)
    return monkeys;
}

let monkeys1 = keepAway(makeMonkeyArray(monkeys), 20, true);
console.log("Part 1",monkeys1[0].inspected * monkeys1[1].inspected)
let monkeys2 = keepAway(makeMonkeyArray(monkeys), 10000, false);
console.log("Part 2",monkeys2[0].inspected * monkeys2[1].inspected)
