import Problem from '../_lib/problem.mjs'

class Day08 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let networkMap = {}
    const directions = this.lines[0]
    console.log({ directions })
    const network = this.lines.splice(2, this.lines.length - 3)
    network.map(
      (str) =>
        (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
    )
    console.log({ networkMap })
    //
    // make a curry function to return the direction value based on the value of an index put into it
    //
    // use a while loop, with a breakCase where target = 'ZZZ'
    //
    //
    return 0
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day08
