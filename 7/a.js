// https://adventofcode.com/2022/day/7
import fs from 'fs'
import { calcSizes, findAndCount, getPath, getTotalLessThan, listDir } from './helper.js';
let text = fs.readFileSync('7\\input.txt', 'utf8')
let textByLine = text.split('\r\n')


let root = new Map();

let path = '';
let listing = false
let totalSpace = 70000000;
let spaceNeeded = 30000000;
for (let line of textByLine) {
    if(listing){
        listDir(root, line, path, listing);
        if(!line.startsWith("$")) continue;
    }
    let [_, command, dir] = line.split(" ");
    
    if(_ === "$"){
        if(command === "cd"){
            if(dir === ".."){
                let fullDir = path.split("/").filter(Boolean);
                fullDir.pop();
                path = fullDir.join("/") + "/" || "/";
                continue;
            }else{
                if(dir !== "/") dir += "/";
            path += dir;
            if(getPath(root, path)) continue;
            }
        }else{
            listing = true;
        }
    }
}

// console.log("Full Disk", root);
calcSizes(root);
console.log("Part 1", getTotalLessThan(root, 100000));
let deleteSize = spaceNeeded - (totalSpace - root.get('$'));
let sizeMap = new Map();
sizeMap = findAndCount(root, deleteSize, "root", sizeMap);
let amountToDelete =  [...sizeMap.entries()].sort((a,b) => b[1] - a[1]).slice(-1)[0][1];
console.log("Part 2", amountToDelete);