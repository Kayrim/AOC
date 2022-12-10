// https://adventofcode.com/2022/day/10
import fs from 'fs'
let text = fs.readFileSync('10\\input.txt', 'utf8').trim()
// let text = fs.readFileSync('10\\sample.txt', 'utf8').trim()
let lines = text.split('\r\n') // split by line

let cycle = 1;
let register = 1;
let signalStrength = [];
let crt = createCrt(40, 6);
let sprite = Array(40).fill(".").map((_, i) => i < 3 ? "#" : ".");
console.log(sprite);

for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let loop = 1;
    let addx = 0;
    const [instruction, value] = line.split(' ');
   if(instruction === "addx"){
       addx += Number(value);
       loop = 2;

   }
   [cycle, register] = runCycles(cycle, loop, register, addx);
}

function runCycles(cycle, loop, register, addx) {
    let crtRow = 0;
    for(let i = 0; i < loop; i++) {
        // Part 2
        if(cycle > 40) {
            crtRow = Math.floor(cycle / 40);
            if (crtRow === crt.length) crtRow = crt.length - 1;
        }
        let pos = (cycle % 40) - 1;
        pos = pos < 0 ? 39 : pos;
        try {
            crt[crtRow][pos] = sprite[pos];
        } catch (error) {
            console.log(cycle, pos, crtRow, crt.length, crt[crtRow]?.length);
        }

        cycle++;
        if(i === loop - 1) register += addx;

        // Part 1
        if(Math.abs(cycle - 20) % 40 === 0 || cycle === 20) {
            let ss = cycle * register;
            signalStrength.push(ss);
        }

    }
    updateSprite(register);
    return [cycle, register];
}

function updateSprite(register) {
    for(let i = 0; i < sprite.length; i++) {
        if(i === register - 1) {
            sprite[i] = "#";
        } else if(i === register) {
            sprite[i] = "#";
        } else if(i === register + 1) {
            sprite[i] = "#";
        } else {
            sprite[i] = ".";
        }
    }
}


function drawCRT (crt) {
    console.log("Part 2")

    for (let i = 0; i < crt.length; i++) {
        console.log(crt[i].join(''))
    }
}

function createCrt (width, height) {
    let crt = [];
    for (let i = 0; i < height; i++) {
        crt.push(Array(width).fill("."));
    }
    return crt;
}


console.log("Part 1", signalStrength.reduce((a, b) => a + b, 0));
drawCRT(crt);