// https://adventofcode.com/2022/day/4
import fs from 'fs'

let text = fs.readFileSync('4\\input.txt', 'utf8')
let textByLine = text.split('\r\n').filter(Boolean);
let ranges = textByLine.map(line => {
    let [r1, r2] = line.split(',').map(range => {
        let [min, max] = range.split('-').map(num => parseInt(num))
        return { min, max }
    })
    return [r1, r2]
})


// Part 1
let sum = 0;
for(let pair of ranges){
    let [r1, r2] = pair;
    if(r1.min >= r2.min && r1.max <= r2.max || r2.min >= r1.min && r2.max <= r1.max){
        sum++;
    }
}
console.log("Part 1", sum);

// Part 2
let sum2 = 0;
for(let pair of ranges){
    let [r1, r2] = pair;
    if(r1.min <= r2.min && r1.max >= r2.min || r2.min <= r1.min && r2.max >= r1.min){
        sum2++;
    }
}
console.log("Part 2", sum2);