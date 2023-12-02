import Problem from '../_lib/problem.mjs'

function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

//start
// fuck it, just convert any substring as we iterate through the string to get the numbers
function convertString(inputString) {
  const wordMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  let result = ''
  let currentWord = ''

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i]

    if (isNaN(char)) {
      // If the character is not a digit, consider it as part of a word
      currentWord += char.toLowerCase()

      // Check if the current word is a key in the wordMap
      if (wordMap.hasOwnProperty(currentWord)) {
        result += wordMap[currentWord]
        currentWord = '' // Reset the current word
      }
    } else {
      // If the character is a digit, append it to the result
      result += char
    }
  }

  return result
}

// Example usage:
// const inputString = "eightwothree3";
// const convertedString = convertString(inputString);
// console.log(convertedString); // Output: "8wo3"

//end

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
    return res
  }
}

export default Day01
