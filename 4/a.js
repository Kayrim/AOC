// https://adventofcode.com/2022/day/3
import fs from 'fs'

// Part 1
let text1 = fs.readFileSync('4\\input.txt', 'utf8')
let textByLine1 = text1.split('\r\n').filter(Boolean);
let ranges = getRangesFromText(textByLine1);

let sum = 0;
for(let pair of ranges){
    let [r1, r2] = pair;
    if(r1.min >= r2.min && r1.max <= r2.max || r2.min >= r1.min && r2.max <= r1.max){
        sum++;
    }
}
console.log("Part 1", sum);

// Part 2
let text2 = fs.readFileSync('4\\input2.txt', 'utf8')
let textByLine2 = text2.split('\r\n').filter(Boolean);
let ranges2 = getRangesFromText(textByLine2);

let sum2 = 0;
for(let pair of ranges2){
    let [r1, r2] = pair;
    if(r1.min <= r2.min && r1.max >= r2.min || r2.min <= r1.min && r2.max >= r1.min){
        sum2++;
    }
}
console.log("Part 2", sum2);




// Helper function to get the ranges from the text
function getRangesFromText(textByLine){
    let ret = textByLine.map((line) => {
        let [r1, r2] = line.split(',').map((range) => {
            let [min, max] = range.split('-').map((num) => parseInt(num));
            return {min, max};
        });
        return [r1, r2];
    });
    return ret;
}