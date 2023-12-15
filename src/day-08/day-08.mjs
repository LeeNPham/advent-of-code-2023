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
    let i = 0
    const directions = this.lines[0]

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

    let places = Object.keys(networkMap)
    let listOfStarts = places.filter((str) => str[2] === 'A')
    let listOfEnds = places.filter((str) => str[2] === 'Z')
    console.log(listOfStarts)
    console.log(listOfEnds)
    //
    // As you follow each left/right instruction,
    // use that instruction to simultaneously navigate away from both nodes you're currently on.
    // Repeat this process until all of the nodes you're currently on end with Z.
    // (If only some of the nodes you're on end with Z,
    // they act like any other node and you continue as normal.)
    //

    //
    let foundTarget = false
    let currentPlace = 'AAA'
    // let currentPlaces =
    let currentTarget = 'ZZZ'

    // while (foundTarget == false) {
    //   if (currentPlace !== currentTarget) {
    //     currentPlace = networkMap[currentPlace][direction(i) == 'L' ? 0 : 1]
    //     i++
    //   } else {
    //     foundTarget = true
    //   }
    // }

    // console.log(i)
    return i
  }
}

export default Day08
