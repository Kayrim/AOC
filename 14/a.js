// https://adventofcode.com/2022/day/14
import fs from 'fs'
let text = fs.readFileSync('14\\test.txt', 'utf8').trim()
// let text = fs.readFileSync('14\\input.txt', 'utf8').trim();
let lines = text.split('\r\n').map(y => y.split(' -> ').map(x => x.split(',').map(x => parseInt(x))));

// find max and min
let [minX, maxX] = lines.map(x => x.map(y => y[0])).flat().reduce((acc, x) => [Math.min(acc[0], x), Math.max(acc[1], x)], [Infinity, -Infinity]);
let [minY, maxY] = lines.map(x => x.map(y => y[1])).flat().reduce((acc, x) => [Math.min(acc[0], x), Math.max(acc[1], x)], [Infinity, -Infinity]);

function createGrid (maxWidth, maxHeight) {
  let grid = []
  for (let i = 0; i < maxHeight; i++) {
    grid.push(Array(maxWidth).fill('.'))
  }
  return grid
}

let grid = createGrid(maxX - minX + 1, maxY + 1)
grid[0][500 - minX] = '+'
drawRocks(grid, lines)
printGrid(grid, 500 - minX, 0)
let unitsOfSand = 0;
let playSand = true;
while(playSand){
    playSand = animateSand(grid, 500 - minX, 0);
    printGrid(grid, 500 - minX, 0)
}

console.log(unitsOfSand)

function printGrid (grid, x, y) {
    // copy the grid
    grid = grid.map(x => x.slice());
    grid[y][x] = 'x';
  grid.forEach((row) => {
    console.log(row.join(''))
  })
}

function drawRocks (grid, rocks) {
    rocks.forEach((line) => {
        // draw #'s from each point to the next
        for(let i = 0; i < line.length - 1; i++){
            let [x1, y1] = line[i];
            let [x2, y2] = line[i+1];
            drawLine(grid, x1, y1, x2, y2);
        }
    })
}

function drawLine (grid, x1, y1, x2, y2) {
    // if the line is vertical
    if(x1 === x2){
        let [min, max] = [y1, y2].sort((a,b) => a - b); 
        for(let y = min; y <= max; y++){
            grid[y][x1-minX] = '#';
        }
    }else{
        let [min, max] = [x1, x2].sort((a,b) => a - b); 
        for(let x = min; x <= max; x++){
            grid[y1][x-minX] = '#';
        }
    }
}

function animateSand(grid, x, y){
    // calculate where the sand will fall
    let falling = true;
    let stillInBounds = true;
    while(falling && stillInBounds){
        if(y === grid.length - 1 || x < 0 || x >= grid[0].length){
            stillInBounds = false;
            falling = false;
        }else if(grid[y+1][x] === '.'){
            y++;
        }else if(grid[y+1][x] === '#' || grid[y+1][x] === 'o'){
            let below = grid[y+1][x];
            let bottomLeft = grid[y+1][x-1];
            let bottomRight = grid[y+1][x+1];

            if(!isSolid(bottomLeft) && isSolid(below) ){
                let newX = x - 1
                if(animateSand(grid, newX, y) === false){                   
                    falling = false;
                    stillInBounds = false;
                }
            }else if(!isSolid(bottomRight) && isSolid(below) && isSolid(bottomLeft)){
                let newX = x + 1
                if(animateSand(grid, newX, y) === false){
                    falling = false;
                    stillInBounds = false;
                }
            }else if(isSolid(bottomLeft) && isSolid(bottomRight) && isSolid(below)){
                // place the sand
                grid[y][x] = 'o';
                unitsOfSand++;
                falling = false;
            }                        
        }
    }

    return stillInBounds;  
}

function isSolid(a){
    return a === '#' || a === 'o';
}


