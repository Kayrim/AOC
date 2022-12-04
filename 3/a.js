// https://adventofcode.com/2022/day/3
import fs from 'fs'
let text = fs.readFileSync('3\\input.txt', 'utf8')
let textByLine = text.split('\r\n').filter(Boolean)
// console.log(textByLine)
// making a map of the scores for lookup
let priority = new Map();
for(let i = 1; i <= 26; i++){
    priority.set(String.fromCharCode(96 + i), i);
    priority.set(String.fromCharCode(64 + i), i + 26);
}

// Part 1 
let sumOfPriorities = 0;
for(const line of textByLine){
    let middle = Math.ceil(line.length / 2);
    let compartments = [];
    compartments.push(line.split('').splice(0, middle));
    compartments.push(line.split('').splice(middle, line.length));
    // find the difference between the two compartments
    let intersections = [...new Set(compartments[0].filter(x => compartments[1].includes(x)))];
    // sum the priority of the intersections
    let interSum = 0;
    for(const intersection of intersections){
        interSum += priority.get(intersection);
    }
    sumOfPriorities += interSum;    
}
console.log("Part 1",sumOfPriorities);

// Part 2
let sumOfPriorities2 = 0;

// split into groups of 3
let groupsOfElves = [];
for(let i = 0; i < textByLine.length; i += 3){
    groupsOfElves.push(textByLine.slice(i, i + 3));
}

for(const group of groupsOfElves){
    // find the intersections of each group of elves, one at a time
    let intersections = [...new Set(group[0].split('').filter(x => group[1].split('').includes(x)))];
    intersections = [...new Set(intersections.filter(x => group[2].split('').includes(x)))];
    // sum the priority of the intersections
    let interSum = 0;
    for(const intersection of intersections){
        interSum += priority.get(intersection);
    }
    sumOfPriorities2 += interSum;
}

console.log("Part 2",sumOfPriorities2);