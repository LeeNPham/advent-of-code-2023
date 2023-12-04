import Problem from '../_lib/problem.mjs'

class Day03 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    // look for the symbols position per row, so we will have the X and the Y of our symbols
    // use that value to check against values in the row before, present row, and row after.
    // if those rows have a number within 3 values of X and Y with the symbol be its origin
    // if the number hasn't already been added
    // we can make sure that the number hasn't already been added by changing the value of the added numbers to . within the list
    // add those numbers onto a counter amd continue iterating through the lists

    return this.lines.reduce((sb, line) => sb + line, '')
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day03
