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

console.log(goodPackets);

function myCompare(a, b){
    if(Array.isArray(a) && !isNaN(b)){
        b = [b];
    }else if(Array.isArray(b) && !isNaN(a)){
        a = [a];
    }
    // if a and b are both numbers 
    if(!isNaN(a) && !isNaN(b)){
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
        let res;
        for(let i = 0; i < Math.min(a.length, b.length); i++){
            let res = myCompare(a[i], b[i]);
            if(res !== 0){
                return res;
            }
        }

        // if we get here, we have to check the length
        if(a.length < b.length){
            return 1;
        }else if(a.length >= b.length){
            return -1;
        }
    }
}