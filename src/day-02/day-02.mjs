import Problem from '../_lib/problem.mjs'

const checkableValues = {
  red: 12,
  green: 13,
  blue: 14,
}

function parseGameData(input) {
  const regex = /(\d+)\s+(\w+)/g
  let match
  const colorCounts = {}

  while ((match = regex.exec(input)) !== null) {
    const count = parseInt(match[1])
    const color = match[2]

    if (!(color in colorCounts) || count > colorCounts[color]) {
      colorCounts[color] = count
    }
  }

  return colorCounts
}

class Day02 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let counter = 0
    this.lines.pop() // deletes last array value because it's empty
    for (let i = 0; i < this.lines.length; i++) {
      let parsedGameData = parseGameData(this.lines[i])
      let counter2 = 0
      for (let key in checkableValues) {
        if (parsedGameData[key] > checkableValues[key]) {
          counter2 = counter2 + 0
        } else {
          counter2 = counter2 + 1
        }
        if (counter2 == 3) {
          counter = counter + (i + 1)
          counter2 = 0
        }
      }
    }
    return counter
  }

  solvePart2() {
    let counter = 0
    for (let i = 0; i < this.lines.length; i++) {
      let parsedGameData = parseGameData(this.lines[i])
      let totalCubePower =
        parsedGameData.red * parsedGameData.green * parsedGameData.blue
      counter = counter + totalCubePower
    }
    console.log(counter)
    return counter
  }
}

export default Day02
