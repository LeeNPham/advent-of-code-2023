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
    //
    //
    // use a recursive function where it loops through the network map, with a breakCase where target = 'ZZZ'
    //
    //
    return 0
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day08
