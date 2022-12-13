// https://adventofcode.com/2022/day/13
import fs from 'fs'
// let text = fs.readFileSync('13\\test.txt', 'utf8').trim()
let text = fs.readFileSync('13\\input.txt', 'utf8').trim()

let packets = text.split('\r\n\r\n').map(x => x.split('\r\n'));

let goodPackets = 0;
let index = 0;

packets.forEach((packet, index) => {
    let [left, right] = packet;
    // JSON parse the packet to make it easier to work with
    left = JSON.parse(left);
    right = JSON.parse(right);
    // console.log(left, right);

    // compare the two packets
    let result = myCompare(left, right);
    if(result === 1 ){
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
        let i = 0;
        while(i < a.length && i < b.length){
            let result = myCompare(a[i], b[i]);
            if(result === 1 || result === -1){
                return result;
            }
            i++;
        }

        if(i === a.length){
            if(a.length === b.length){
                return 0;
            }else{
                return 1;
            }
        }

        // we must be at the end of b
        return -1;        
    }
}