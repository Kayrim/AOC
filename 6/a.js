// https://adventofcode.com/2022/day/6
import fs from 'fs'
let text = fs.readFileSync('6\\input.txt', 'utf8')
let buffer = text.split('');

function getMarker(buffer, length){
    let marker = 0;
    let queue = [];
    for(let i = 0; i < buffer.length; i++){
        if(queue.length < length){
            queue.push(buffer[i]);
        }else{
            queue.shift();
            queue.push(buffer[i]);
        }
        if(queue.length == length){
            let res = queue.filter((x, i, a) => a.indexOf(x) == i);
            if(res.length == length){
                marker = i+1;
                break;
            }
        }
    }
    return marker;
}

let marker = getMarker(buffer, 4);
let marker2 = getMarker(buffer,14);

console.log("Part 1: " + marker);
console.log("Part 2: " + marker2);
