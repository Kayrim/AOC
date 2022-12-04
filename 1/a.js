// https://adventofcode.com/2022/day/1
import fs from "fs";
let text = fs.readFileSync('1\\input.txt', 'utf8');
let textByLine = text.split("\r\n")

let elves = new Map();
let calories = [];

while (textByLine.length > 0) {
    
    let line = textByLine.shift();
    if(line !== ""){
        calories.push(line);
    }else{
        let total = calories.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        elves.set(total, calories);
        calories = [];
    }
}

// order the map by key
let sorted = new Map([...elves.entries()].sort((a, b) => b[0] - a[0]));

// Part 1 
// get the first key
let firstKey = [...sorted.keys()][0];
console.log("Part 1", firstKey);

// Part 2
// grap the top 3 keys and sum them
let top3 = [...sorted.keys()].slice(0, 3).reduce((a, b) => a + b, 0);
console.log("Part 2", top3);
