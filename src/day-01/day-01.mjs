import Problem from '../_lib/problem.mjs'

function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

//start
// fuck it, just convert any substring as we iterate through the string to get the numbers
//explanation for the following code: To deal with spelled out numbers that "share" a letter (eg. eightwo, where they share a "t"), we map out the
//numbers to retain the first and last letters so that the subsequent spelled letters still get converted. In the original regex mapping, what was
//happening was eightwo would be changed to 8wo when we wanted 82 since regex apparently cannot detect "two" after "eight" has been converted into 8.
function convertString(input) {
  const replacements = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  }

  let result = input
  for (const key in replacements) {
    if (replacements.hasOwnProperty(key)) {
      const regex = new RegExp(key, 'g')
      result = result.replace(regex, replacements[key])
    }
  }

  return result
}

class Day01 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let res = 0
    let leftList = []
    let rightList = []

    for (let value of this.lines) {
      let leftIndex = 0
      let rightIndex = value.length

      while (leftIndex <= value.length) {
        if (isNumeric(value[leftIndex])) {
          leftList.push(value[leftIndex])
          break
        } else {
          leftIndex = leftIndex + 1
        }
      }

      while (rightIndex >= 0) {
        if (isNumeric(value[rightIndex])) {
          rightList.push(value[rightIndex])
          break
        } else {
          rightIndex = rightIndex - 1
        }
      }
    }
    let counter = 0
    for (let i = 0; i < leftList.length; i++) {
      counter = counter + parseInt(leftList[i] + rightList[i])
    }
    res = counter
    return res
  }

  solvePart2() {
    let res = 0
    let leftList = []
    let rightList = []
    for (let value of this.lines) {
      console.log('first value version', value)
      value = convertString(value)
      console.log('second value version', value)
      let leftIndex = 0
      let rightIndex = value.length
      while (leftIndex <= value.length) {
        if (isNumeric(value[leftIndex])) {
          leftList.push(value[leftIndex])
          break
        } else {
          leftIndex = leftIndex + 1
        }
      }
      while (rightIndex >= 0) {
        if (isNumeric(value[rightIndex])) {
          rightList.push(value[rightIndex])
          break
        } else {
          rightIndex = rightIndex - 1
        }
      }
    }
    let counter = 0
    for (let i = 0; i < leftList.length; i++) {
      counter = counter + parseInt(leftList[i] + rightList[i])
    }
    res = counter
    console.log(res)
    return res
  }
}

export default Day01
