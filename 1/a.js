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
let sorted = new Map([...elves.entries()].sort((a, b) => a[0] - b[0]));

// Part 1 
console.log("Part 1", [...sorted].slice(-1)[0][0]);

// grap the last 3 
let last3 = [...sorted].slice(-3);

// add up the keys
let total = last3.reduce((a, b) => a + b[0], 0);

console.log("Part 2", total);
