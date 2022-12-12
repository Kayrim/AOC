// https://adventofcode.com/2022/day/12
import fs from 'fs'
import { exit } from 'process'
// let text = fs.readFileSync('12\\test.txt', 'utf8').trim()
let text = fs.readFileSync('12\\input.txt', 'utf8').trim()

let lines = text.split('\r\n')
let grid = lines.map((l) => l.split(''))

let levels = {S: 1, E: 26}
for (let i = 1; i <= 26; i++) {
  levels[String.fromCharCode(96 + i)] = i
}

console.log(levels)

// find the starting position
function returnCoords(grid, char) {
    let x = 0
    let y = 0
    let level = 0
    for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === char) {
        x = j
        y = i
        level = levels[char]
        }
    }
    }
    return { x, y, level}
}

let start = returnCoords(grid, 'S')
let end = returnCoords(grid, 'E')

// find path using BFS
function findPath(grid, start, end, shortest = false) {
    let queue = []
    let visited = new Set()
    let path = []
    let found = false
    let parent = {}
    queue.push(start)
    visited.add(`${start.x},${start.y},${start.level}`)
    while (queue.length > 0) {
    let current = queue.shift()
    if (current.x === end.x && current.y === end.y && current.level === end.level) {
        found = true
        break
    }
    let neighbors = getNeighbors(grid, current)
    for (let neighbor of neighbors) {
        if (!visited.has(`${neighbor.x},${neighbor.y},${neighbor.level}`)) {
        queue.push(neighbor)
        visited.add(`${neighbor.x},${neighbor.y},${neighbor.level}`)
        parent[`${neighbor.x},${neighbor.y},${neighbor.level}`] = current
        }
    }
    }
    if (found) {
    let current = end
    if(shortest) {
        while (current.level !== start.level ) {
            path.push(current)
            current = parent[`${current.x},${current.y},${current.level}`]
        }
    } else {
        while (current.x !== start.x || current.y !== start.y || current.level !== start.level) {
            path.push(current)
            current = parent[`${current.x},${current.y},${current.level}`]
        }
    }
    path.push(start)
    path.reverse()
    }
    return path
}

function getNeighbors(grid, current) {
    let neighbors = []
    let x = current.x
    let y = current.y
    let level = current.level

    // up
    if (y > 0 && levels[grid[y - 1][x]] <= level + 1) {
    neighbors.push({ x, y: y - 1, level: levels[grid[y - 1][x]] })
    }
    // down
    if (y < grid.length - 1 && levels[grid[y + 1][x]] <= level + 1) {
    neighbors.push({ x, y: y + 1, level: levels[grid[y + 1][x]] })
    }
    // left
    if (x > 0 && levels[grid[y][x - 1]] <= level + 1) {
    neighbors.push({ x: x - 1, y, level: levels[grid[y][x - 1]] })
    }
    // right
    if (x < grid[0].length - 1 && levels[grid[y][x + 1]] <= level + 1) {
    neighbors.push({ x: x + 1, y, level: levels[grid[y][x + 1]] })
    }
    return neighbors
}


let path = findPath(grid, start, end)
console.log("Part 1", path.length - 1)

// part 2
let path2 = findPath(grid, start, end, true)
console.log("Part 2", path2.length - 1)