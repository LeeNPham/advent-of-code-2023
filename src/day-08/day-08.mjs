import Problem from '../_lib/problem.mjs'

class Day08 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let networkMap = {}
    const directions = this.lines[0]
    console.log({ directions })

    const direction = (i) => {
      let effectiveIndex = i % directions.length
      return directions[effectiveIndex]
    }

    const network = this.lines.splice(2, this.lines.length - 3)
    network.map(
      (str) =>
        (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
    )
    console.log({ networkMap })

    let i = 0
    let foundTarget = false
    let currentPlace = 'AAA'
    let currentTarget = 'ZZZ'
    // use a recursive function where it loops through the network map, with a breakCase where target = 'ZZZ'
    while (foundTarget == false) {
      if (currentPlace !== currentTarget) {
        // change value of currentPlace based on the i (which is either the left or right value which is the next key)
        currentPlace = networkMap[currentPlace][direction(i) == 'L' ? 0 : 1]
        i++
      } else {
        foundTarget = true
      }
    }
    console.log(i)
    return i
  }

  solvePart2() {
    let networkMap = {}
    const directions = this.lines[0]
    console.log({ directions })

    const direction = (i) => {
      let effectiveIndex = i % directions.length
      return directions[effectiveIndex]
    }

    const network = this.lines.splice(2, this.lines.length - 3)
    network.map(
      (str) =>
        (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
    )
    console.log({ networkMap })

    let i = 0
    let foundTarget = false
    let currentPlace = 'AAA'
    let currentTarget = 'ZZZ'
    // use a recursive function where it loops through the network map, with a breakCase where target = 'ZZZ'
    while (foundTarget == false) {
      if (currentPlace !== currentTarget) {
        // change value of currentPlace based on the i (which is either the left or right value which is the next key)
        currentPlace = networkMap[currentPlace][direction(i) == 'L' ? 0 : 1]
        i++
      } else {
        foundTarget = true
      }
    }
    console.log(i)
    return i
  }
}

export default Day08
