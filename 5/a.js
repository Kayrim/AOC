// https://adventofcode.com/2022/day/5
import fs from 'fs';
let text = fs.readFileSync('5\\input.txt', 'utf8')
let textByLine = text.split('\r\n')

// split the array into two arrays from the the first empty line
let splitIndex = textByLine.indexOf('')
let map = textByLine.slice(0, splitIndex)
let stacks = map.pop().split(' ').filter(Boolean)
let instructions = textByLine.slice(splitIndex + 1)

let stack = {}

// Create the initial stacks
for (let i = 0; i < map.length; i++) {
  let values = map[i].split('')
  let pos = 0
  for (let j = 1; j < values.length; j += 4) {
    // contains [ or ]
    if (values[j].trim() !== '') {
      let val = values[j].replace('[', '').replace(']', '')
      stack[stacks[pos]] = [val, ...(stack[stacks[pos]] || [])]
    }
    pos++
  }
}

// copy stack into a new object for part 2
let stack2 = JSON.parse(JSON.stringify(stack))

// apply the instructions
for (let i = 0; i < instructions.length; i++) {
  // split and then remove anything that isnt a number
  let [amount, from, to] = instructions[i].split(' ').filter(x => !isNaN(x))

  // move the amount from the from stack to the to stack
  for (let j = 0; j < amount; j++) {
    stack[to] = [...(stack[to] || []), stack[from].pop()]
  }

  let temp = stack2[from].splice(-amount)
  stack2[to] = [...(stack2[to] || []), ...temp]
}

// concat the last element of each stack
let result1 = ''
let result2 = ''
for (let i = 0; i < stacks.length; i++) {
  result1 += stack[stacks[i]].pop()
  result2 += stack2[stacks[i]].pop()
}

console.log('Part 1', result1)
console.log('Part 2', result2)