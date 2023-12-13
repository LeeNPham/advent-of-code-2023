import Problem from '../_lib/problem.mjs'

class Day07 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let hands = this.lines
      .map((a) => a.split(' '))
      .filter((hand) => hand[0] !== '')
    let ranks = hands.length
    let counter = 0
    let fiveOfAKind = []
    let fourOfAKind = []
    let fullHouse = []
    let threeOfAKind = []
    let twoPair = []
    let onePair = []
    let highCard = []
    const valueMap = {
      A: 14,
      K: 13,
      Q: 12,
      J: 11,
      T: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    }

    // count char frequencies
    function countCharacterFrequencies(str) {
      const frequencyMap = {}
      for (let char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1
      }
      return Object.values(frequencyMap).sort((a, b) => b - a)
    }

    // sort each type of hands list by their first value
    function sortList(list) {
      return list.sort((a, b) => {
        for (let i = 0; i < Math.min(a[0].length, b[0].length); i++) {
          if (a[0][i] !== b[0][i]) {
            return valueMap[b[0][i]] - valueMap[a[0][i]]
          }
        }
        return 0
      })
    }

    //sort into types of hands
    for (let hand of hands) {
      let occurances = countCharacterFrequencies(hand[0])
      if (occurances[0] == 5) {
        fiveOfAKind.push(hand)
      }
      if (occurances[0] == 4) {
        fourOfAKind.push(hand)
      }
      if (occurances[0] == 3 && occurances[1] == 2) {
        fullHouse.push(hand)
      }
      if (occurances[0] == 3 && occurances[1] == 1) {
        threeOfAKind.push(hand)
      }
      if (occurances[0] == 2 && occurances[1] == 2) {
        twoPair.push(hand)
      }

      if (occurances[0] == 2 && occurances[1] == 1) {
        onePair.push(hand)
      }

      if (occurances[0] == 1) {
        highCard.push(hand)
      }
    }

    const sortedFiveOfAKind = sortList(fiveOfAKind)
    const sortedFourOfAKind = sortList(fourOfAKind)
    const sortedFullHouse = sortList(fullHouse)
    const sortedThreeOfAKind = sortList(threeOfAKind)
    const sortedTwoPair = sortList(twoPair)
    const sortedOnePair = sortList(onePair)
    const sortedHighCard = sortList(highCard)
    let finalSortedList = sortedFiveOfAKind
      .concat(sortedFourOfAKind)
      .concat(sortedFullHouse)
      .concat(sortedThreeOfAKind)
      .concat(sortedTwoPair)
      .concat(sortedOnePair)
      .concat(sortedHighCard)
    finalSortedList.reverse()

    for (let i = 1; i <= ranks; i++) {
      counter = counter + finalSortedList[i - 1][1] * i
    }

    console.log(counter)
    return counter
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day07
