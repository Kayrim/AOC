// https://adventofcode.com/2022/day/9
import fs from 'fs'
let text = fs.readFileSync('9\\input.txt', 'utf8')
let test1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
let test2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

// let instructions = test1.split("\n").map((row) => row.split(" "));
// let instructions = test2.split("\n").map((row) => row.split(" "));
let instructions = text.split("\r\n").map((row) => row.split(" "));
console.log(instructions);

let visited1 = new Set();
let visited2 = new Set();
// create an array of 10 x, y coordinates
let knots = Array.from({length: 2}, () => [0, 0]);
let knots2 = Array.from({length: 10}, () => [0, 0]);

function doRopePhysics(instructions, visited, knots) {
    visited.add(`${0},${0}`);
    for(let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        let direction = instruction[0];
        let distance = parseInt(instruction[1]);
        for(let j = 0; j < distance; j++) {
            switch(direction) {
                case "U":
                    knots[0][1]++;
                    break;
                case "D":
                    knots[0][1]--;
                    break;
                case "L":
                    knots[0][0]--;
                    break;
                case "R":
                    knots[0][0]++;
                    break;
            }
            for(let k = 1; k < knots.length; k++) {
                let track;
                k === knots.length - 1 ?  track = true : track = false;
                knots[k] = calulateTail(knots[k-1][0], knots[k-1][1], knots[k][0], knots[k][1] ,track, visited);
            }   
        }
    }
}



function calulateTail(x1, y1, x2, y2, track = false, visited) {
    // check if head is more than one unit away from tail
    if(Math.abs(x1 - x2) > 1 || Math.abs(y1 - y2) > 1) {
        // move diagonally towards head
        if(x1 > x2 && y1 > y2) {
            x2++;
            y2++;
        }
        else if(x1 < x2 && y1 < y2) {
            x2--;
            y2--;
        }
        else if(x1 > x2 && y1 < y2) {
            x2++;
            y2--;
        }
        else if(x1 < x2 && y1 > y2) {
            x2--;
            y2++;
        }        
        // move horizontally towards head
        else if(x1 > x2) {
            x2++;
        }
        else if(x1 < x2) {
            x2--;
        }
        // move vertically towards head
        else if(y1 > y2) {
            y2++;
        }
        else if(y1 < y2) {
            y2--;
        }
    }
    if(track) visited.add(`${x2},${y2}`);
    
    return [x2, y2];
}

function drawGrid(visited) {
    let grid = [];
    // reverse the entries so that the origin is in the middle
    let visitedArray = [...visited.entries()];
    // find the highest x and y values
    let maxDistance = 0;
    visitedArray.forEach((entry) => {
        let [x, y] = entry[0].split(",");
        x = parseInt(x);
        y = parseInt(y);
        if(Math.abs(x) > maxDistance) maxDistance = Math.abs(x);
        if(Math.abs(y) > maxDistance) maxDistance = Math.abs(y);
    });
    
    maxDistance = maxDistance * 2 + 1;
    let start = Math.floor(maxDistance / 2);
    for(let i = 0; i < maxDistance; i++) {
        grid.push(Array.from({length: maxDistance}, () => "."));
    }
    console.log(start);
    visitedArray.forEach((entry, i) => {
        try {
            let [x, y] = entry[0].split(",");
            x = parseInt(x);
            y = parseInt(y);
            // invert the y value to mirror the grid 
            x = start + x;
            y = start - y;
            
            grid[y][x] = i === 0 ? "S" : "X";
        } catch (error) {
            console.log(error);           
        }
    });
    
    
    // draw the grid
    for(let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(""));
    }
}

doRopePhysics(instructions, visited1, knots);
doRopePhysics(instructions, visited2, knots2);
console.log("Part 1", visited1.size);
drawGrid(visited1);
console.log("Part 2", visited2.size);
drawGrid(visited2);