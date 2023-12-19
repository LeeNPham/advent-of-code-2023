import Problem from '../_lib/problem.mjs'

class Day10 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    // hello world
    const lines = this.lines
    console.log({ lines })
    return 0
    // return this.lines.reduce((sb, line) => sb + line, '')
  }

  // solvePart2() {
  //   return parseInt(this.solvePart1())
  // }
}

export default Day10
