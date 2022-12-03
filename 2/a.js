// https://adventofcode.com/2022/day/2
import fs from 'fs'
var text = fs.readFileSync('2\\input.txt', 'utf8')
var textByLine = text.split('\r\n').filter(Boolean)

let scores = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

let outcome = {
    X: "Lose",
    Y: "Draw",
    Z: "Win"
}

let map = {
    A: {
        Lose: "Z",
        Draw: "X",
        Win: "Y"
    },
    B: {
        Lose: "X",
        Draw: "Y",
        Win: "Z"
    },
    C: {
        Lose: "Y",
        Draw: "Z",
        Win: "X"
    }
}

let score = 0

// Part 1
for(const line of textByLine){
    let plays = line.split(' ');
        if(scores[plays[0]] === scores[plays[1]]){
            score += 3;
            score += scores[plays[1]];
            continue;
        }
        if(scores[plays[1]] > scores[plays[0]]){

            if(scores[plays[0]] === 1 && scores[plays[1]] === 3){
                score += scores[plays[1]];
                continue;
            }
            score += scores[plays[1]];
            score += 6;
            continue;
        }else if(scores[plays[1]] < scores[plays[0]]){
            if(scores[plays[1]] === 1 && scores[plays[0]] === 3){
                score += scores[plays[1]];
                score += 6;
                continue;
            }
            score += scores[plays[1]];
            continue;
        }
}
console.log("Part 1", score);


var text2 = fs.readFileSync('2\\input2.txt', 'utf8')
var textByLine2 = text2.split('\r\n').filter(Boolean)

// Part 2
let score2 = 0
for(const line of textByLine2){
    let plays = line.split(' ');
    let weNeedTo = outcome[plays[1]];
    let playToMake = map[plays[0]][outcome[plays[1]]]
    if(weNeedTo === "Win"){
        score2 += scores[playToMake]
        score2 += 6
    }else if(weNeedTo === "Lose"){
        score2 += scores[playToMake]
    }else{
        score2 += scores[playToMake]
        score2 += 3
    }
}
console.log("Part 2", score2);
