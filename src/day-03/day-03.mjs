import Problem from '../_lib/problem.mjs'

class Day03 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   // look for the symbols position per row, so we will have the X and the Y of our symbols
  //   // use that value to check against values in the row before, present row, and row after.
  //   // if those rows have a number within 3 values of X and Y with the symbol be its origin
  //   // if the number hasn't already been added
  //   // we can make sure that the number hasn't already been added by changing the value of the added numbers to . within the list
  //   // add those numbers onto a counter amd continue iterating through the lists
  //   //
  //   // return this.lines.reduce((sb, line) => sb + line, '')

  //   const symbolRegex = /[^0-9.]/g

  //   const getNumber = (currIndex, lineIndex) => {
  //     let number = this.lines[lineIndex][currIndex]

  //     // replace right
  //     for (let i = currIndex + 1; i < this.lines[lineIndex].length; i++) {
  //       if (isNaN(+this.lines[lineIndex][i])) break

  //       number = number + this.lines[lineIndex][i]
  //       replaceNumberWithDot(i, lineIndex)
  //     }

  //     // replace left
  //     for (let i = currIndex - 1; i >= 0; i--) {
  //       if (isNaN(+this.lines[lineIndex][i])) break

  //       number = this.lines[lineIndex][i] + number
  //       replaceNumberWithDot(i, lineIndex)
  //     }

  //     return +number
  //   }

  //   const replaceNumberWithDot = (currIndex, lineIndex) => {
  //     const arr = this.lines[lineIndex].split('')
  //     arr.splice(currIndex, 1, '.')
  //     const newStr = arr.join('')
  //     this.lines[lineIndex] = newStr
  //   }

  //   const getSumOfAdjacentNumbers = (symbolIndex, lineIndex) => {
  //     const directions = [
  //       { row: 0, col: -1 }, // left
  //       { row: 0, col: 1 }, // right
  //       { row: -1, col: 0 }, // top
  //       { row: 1, col: 0 }, // bottom
  //       { row: -1, col: -1 }, // top left diag
  //       { row: -1, col: 1 }, // top right diag
  //       { row: 1, col: -1 }, // bottom left diag
  //       { row: 1, col: 1 }, // bottom right diag
  //     ]

  //     let sum = 0
  //     for (const dir of directions) {
  //       const newRow = lineIndex + dir.row
  //       const newCol = symbolIndex + dir.col

  //       if (
  //         this.lines[newRow] &&
  //         this.lines[newRow][newCol] &&
  //         !isNaN(+this.lines[newRow][newCol])
  //       ) {
  //         sum += getNumber(newCol, newRow)
  //       }
  //     }

  //     return sum
  //   }

  //   const addAdjacentNumbers = (lineIndex, line) => {
  //     let sum = 0

  //     for (let i = 0; i < line.length; i++) {
  //       const char = this.lines[lineIndex][i]
  //       if (symbolRegex.test(char))
  //         sum += getSumOfAdjacentNumbers(i, lineIndex, line)
  //     }

  //     return sum
  //   }

  //   let finalNumber = 0
  //   for (let i = 0; i < this.lines.length; i++) {
  //     const line = this.lines[i]
  //     if (symbolRegex.test(line)) finalNumber += addAdjacentNumbers(i, line)
  //   }

  //   console.log(finalNumber)
  //   return finalNumber
  // }

  solvePart2() {
    const symbolRegex = /[^0-9.]/g
    const addAjacentNumbers = (lineIndex, line) => {
      let sum = 0

      for (let i = 0; i < line.length; i++) {
        const char = this.lines[lineIndex][i]
        if (symbolRegex.test(char))
          sum += getSumOfAjacentNumbers(i, lineIndex, line)
      }

      return sum
    }

    const getSumOfAjacentNumbers = (symbolIndex, lineIndex) => {
      let nums = []
      // left
      if (
        this.lines[lineIndex][symbolIndex - 1] &&
        !isNaN(+this.lines[lineIndex][symbolIndex - 1])
      )
        nums.push(getNumber(symbolIndex - 1, lineIndex))
      // right
      if (
        this.lines[lineIndex][symbolIndex + 1] &&
        !isNaN(+this.lines[lineIndex][symbolIndex + 1])
      )
        nums.push(getNumber(symbolIndex + 1, lineIndex))
      // top
      if (
        this.lines[lineIndex - 1] &&
        this.lines[lineIndex - 1][symbolIndex] &&
        !isNaN(+this.lines[lineIndex - 1][symbolIndex]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex, lineIndex - 1))
      // bottom
      if (
        this.lines[lineIndex + 1] &&
        this.lines[lineIndex + 1][symbolIndex] &&
        !isNaN(+this.lines[lineIndex + 1][symbolIndex]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex, lineIndex + 1))

      // Top left diag
      if (
        this.lines[lineIndex - 1] &&
        this.lines[lineIndex - 1][symbolIndex - 1] &&
        !isNaN(+this.lines[lineIndex - 1][symbolIndex - 1]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex - 1, lineIndex - 1))
      // Top right diag
      if (
        this.lines[lineIndex - 1] &&
        this.lines[lineIndex - 1][symbolIndex + 1] &&
        !isNaN(+this.lines[lineIndex - 1][symbolIndex + 1]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex + 1, lineIndex - 1))
      // Bottom left diag
      if (
        this.lines[lineIndex + 1] &&
        this.lines[lineIndex + 1][symbolIndex - 1] &&
        !isNaN(+this.lines[lineIndex + 1][symbolIndex - 1]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex - 1, lineIndex + 1))
      // Bottom right diag
      if (
        this.lines[lineIndex + 1] &&
        this.lines[lineIndex + 1][symbolIndex + 1] &&
        !isNaN(+this.lines[lineIndex + 1][symbolIndex + 1]) &&
        nums.length < 2
      )
        nums.push(getNumber(symbolIndex + 1, lineIndex + 1))

      return nums.length < 2 ? 0 : nums.reduce((prev, curr) => prev * curr, 1)
    }

    const getNumber = (currIndex, lineIndex) => {
      let number = this.lines[lineIndex][currIndex]

      // replace right
      for (let i = currIndex + 1; i < this.lines[lineIndex].length; i++) {
        if (isNaN(+this.lines[lineIndex][i])) break

        number = number + this.lines[lineIndex][i]
        replaceNumberWithDot(i, lineIndex)
      }

      // replace left
      for (let i = currIndex - 1; i >= 0; i--) {
        if (isNaN(+this.lines[lineIndex][i])) break

        number = this.lines[lineIndex][i] + number
        replaceNumberWithDot(i, lineIndex)
      }

      return +number
    }

    const replaceNumberWithDot = (currIndex, lineIndex) => {
      const arr = this.lines[lineIndex].split('')
      arr.splice(currIndex, 1, '.')
      const newStr = arr.join('')
      this.lines[lineIndex] = newStr
    }

    let finalNumber = 0
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]
      if (symbolRegex.test(line)) finalNumber += addAjacentNumbers(i, line)
    }

    // console.log(finalNumber)
    return finalNumber
  }
}

export default Day03
