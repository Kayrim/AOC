// https://adventofcode.com/2022/day/13
import fs from 'fs'
// let text = fs.readFileSync('13\\test.txt', 'utf8').trim()
let text = fs.readFileSync('13\\input.txt', 'utf8').trim();
let packets = text.split('\r\n\r\n').map(x => x.split('\r\n').map(y => JSON.parse(y)));
let goodPackets = 0;

packets.forEach((packet, index) => {
    let [left, right] = packet;
    // compare the two packets
    let result = myCompare(left, right);
    if(result === 1){
        goodPackets += index + 1;
    }
});

// Part 1
console.log("Part 1", goodPackets);

// Part 2
let dividers = [[[2]],[[6]]];
packets.push(dividers);
// have to reverse the array because myCompare is backwards
packets = packets.flat().sort(myCompare).reverse();
// find the index of the packet we added, index starts at 1
let res = packets.reduce((acc, packet, index) => 
    dividers.includes(packet) ? acc * (index+1) : acc, 1);
console.log("Part 2", res);

function myCompare(a, b){
    if(Array.isArray(a) && typeof b === 'number'){
        b = [b];
    }else if(Array.isArray(b) && typeof a === 'number'){
        a = [a];
    }
    // if a and b are both numbers 
    if(typeof a === 'number' && typeof b === 'number'){
        if(a < b){
            return 1;
        }else if(a > b){
            return -1;
        }else{
            return 0;
        }
    }

    // if there both arrays
    if(Array.isArray(a) && Array.isArray(b)){
        for(let i = 0; i < Math.min(a.length, b.length); i++){
            let res = myCompare(a[i], b[i]);
            if(res !== 0){
                return res;
            }
        }

        // if we get here, we have to check the length
        if(a.length < b.length){
            return 1;
        }else if(a.length >b.length){
            return -1;
        }
        return 0;
    }
}