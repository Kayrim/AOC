// https://adventofcode.com/2022/day/8
import fs from 'fs';
let text = fs.readFileSync('8\\input.txt', 'utf8');
// let text = `30373
// 25512
// 65332
// 33549
// 35390`;
let trees = text.split("\r\n").map((row) => row.split(""));

let visibles = new Set();
let scenicScores = [];
for(let i = 0; i < trees.length; i++) {
    for(let j = 0; j < trees[i].length; j++) {
        // base case
        if(i == 0 || i == trees.length - 1 || j == 0 || j == trees[i].length - 1) {
            visibles.add(`${i},${j}`);
            continue;
        }
        let treeHeight = trees[i][j];
        let scores = {
            above: 0,
            below: 0,
            left: 0,
            right: 0
        }
        // check all trees above, below, left, right

        // above
        let visible = true;
        for(let k = i - 1; k >= 0; k--) {
            scores.above++;
            if(trees[k][j] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if(visible) visibles.add(`${i},${j}`);
        
        // below
        visible = true;
        for(let k = i + 1; k < trees.length; k++) {
            scores.below++;
            if(trees[k][j] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if(visible) visibles.add(`${i},${j}`);

        // left
        visible = true;
        for(let k = j - 1; k >= 0; k--) {
            scores.left++;
            if(trees[i][k] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if(visible) visibles.add(`${i},${j}`);

        // right
        visible = true;
        for(let k = j + 1; k < trees[i].length; k++) {
            scores.right++;
            if(trees[i][k] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if(visible) visibles.add(`${i},${j}`);
        scenicScores.push(Object.values(scores).reduce((a,b) => a * b));

    }
}

console.log("Part 1",visibles.size);
console.log("Part 2",Math.max(...scenicScores));