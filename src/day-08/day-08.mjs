import Problem from '../_lib/problem.mjs'

class Day08 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   let networkMap = {}
  //   const directions = this.lines[0]
  //   console.log({ directions })

  //   const direction = (i) => {
  //     let effectiveIndex = i % directions.length
  //     return directions[effectiveIndex]
  //   }

  //   const network = this.lines.splice(2, this.lines.length - 3)
  //   network.map(
  //     (str) =>
  //       (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
  //   )
  //   console.log({ networkMap })

  //   let i = 0
  //   let foundTarget = false
  //   let currentPlace = 'AAA'
  //   let currentTarget = 'ZZZ'
  //   // use a recursive function where it loops through the network map, with a breakCase where target = 'ZZZ'
  //   while (foundTarget == false) {
  //     if (currentPlace !== currentTarget) {
  //       // change value of currentPlace based on the i (which is either the left or right value which is the next key)
  //       currentPlace = networkMap[currentPlace][direction(i) == 'L' ? 0 : 1]
  //       i++
  //     } else {
  //       foundTarget = true
  //     }
  //   }
  //   console.log(i)
  //   return i
  // }

  solvePart2() {
    // an important thing to realize is that we don't care that it hits every ending key with a Z, we just want it to hit at least 1
    // greatest common denominator
    // The first clue is in the guiding text:
    // After examining the maps a bit longer, your attention is drawn to a curious fact: the number of nodes with names ending in A is equal to the number ending in Z!
    // The number of steps it takes for a ghost to get to the end is a clean multiple of the instruction length for every ghost.
    // Each ghost has a seperate ending point, and never visits other ending points.
    // All ghosts loop back around to their starting point, and then to their starting point, and then their ending point, until infinity.
    // Every last location leads to the second location that ghost ever visited.
    // That means every loop a ghost does is identical in length.

    // tl;dr: Every ghost is on their own loop, they go round, and round, eventually all standing on a location that ends in a Z.
    // All this put together means that, for every ghost you figure out how long it takes until they reach their ending location.
    // A time where all ghosts are at their ending location at the same time is the least common multiple of all those numbers.
    // To find that, I first found the greatest common divisor using the Euclidian algorithm
    // In code, I kept track of how many full instruction lines were executed.
    // Every time I execute a full set of instructions (the first line of the input without repeating),
    //       I check if any ghosts are at their ending, and keep track of how many sets of instructions it took.

    function gcd(a, b) {
      while (b !== 0) {
        const temp = a
        a = b
        b = temp % b
      }
      return a
    }

    // lowest common multiplier
    function lcm(a, b) {
      return (a * b) / gcd(a, b)
    }

    let networkMap = {}
    const instructions = this.lines[0]
    const network = this.lines.slice(2, this.lines.length - 1)

    network.forEach((str) => {
      networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]
    })

    // console.log({ networkMap })

    const ghosts = Object.keys(networkMap)
      .filter((node) => node.endsWith('A'))
      .map((pos) => ({ pos, cycles: null }))

    console.log('before', { ghosts })

    let cycleCount = 0
    const instructionLength = instructions.length

    while (ghosts.some((ghost) => ghost.cycles === null)) {
      for (let i = 0; i < instructionLength; i++) {
        const ins = instructions[i] // output is L or R
        ghosts.forEach((ghost) => {
          if (ghost.cycles !== null) return
          const [left, right] = networkMap[ghost.pos]
          ghost.pos = ins === 'L' ? left : right
        })
      }
      cycleCount++

      ghosts.forEach((ghost) => {
        if (ghost.cycles !== null) return
        if (ghost.pos.endsWith('Z')) {
          ghost.cycles = cycleCount
        }
      })
    }

    console.log('after', { ghosts })

    const minSharedCycles = ghosts
      .filter((ghost) => ghost.cycles !== null)
      .reduce((acc, ghost) => lcm(acc, ghost.cycles), 1)

    return minSharedCycles * instructionLength
  }
}

export default Day08
