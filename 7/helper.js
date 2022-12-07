export const listDir = (root, line, path, listing) => {
  let list = line.split(' ')
  if (list[0] === '$') {
    listing = false
    return
  }
  if (list[0] === 'dir') {
    // its a directory
    setNewPath(root, path, list[1], new Map())
  } else {
    // its a file
    setNewPath(root, path, list[1], parseInt(list[0]))
  }
}

export const getPath =(root, path) =>{
  if (path === '/') return root
  let dirs = path.split('/').filter(Boolean)
  let current = root
  for (let dir of dirs) {
    current = current.get(dir)
  }
  return current
}

export const setNewPath =(root, path, key, value) =>{
  if (path === '/') return root.set(key, value)
  let dirs = path.split('/').filter(Boolean)
  let current = root
  for (let dir of dirs) {
    current = current.get(dir)
  }
  current.set(key, value)
}

export const calcSizes =(root) =>{
  let size = 0
  for (let [_, value] of root) {
    // if its a directory then recurse, but keep track of this new dirs size
    if (value instanceof Map) {
      size += calcSizes(value)
    } else {
      size += parseInt(value)
    }
  }
  root.set('$', size)
  return size
}

export const getTotalLessThan= (root, limit = 100000)=> {
  let total = 0
  if (root instanceof Map) {
    for (let [key, value] of root) {
      if (key === '$' && value < limit) total += value
      if (value instanceof Map) {
        total += getTotalLessThan(value)
      }
    }
  }
  return total
}

export const findAndCount= (root, size, name, sizes) =>{
  // loop through all the files and record the sizes of the ones that are bigger than the size we need to delete
  for (let [key, value] of root) {
    if (value instanceof Map) {
      sizes = findAndCount(value, size, key, sizes)
    } else if (key === '$' && value > size) {
      sizes.set(name, value)
    }
  }
  return sizes
}
