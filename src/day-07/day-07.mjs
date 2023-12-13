import Problem from '../_lib/problem.mjs'

class Day07 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   let hands = this.lines
  //     .map((a) => a.split(' '))
  //     .filter((hand) => hand[0] !== '')
  //   let ranks = hands.length
  //   let counter = 0
  //   let fiveOfAKind = []
  //   let fourOfAKind = []
  //   let fullHouse = []
  //   let threeOfAKind = []
  //   let twoPair = []
  //   let onePair = []
  //   let highCard = []
  //   const valueMap = {
  //     A: 14,
  //     K: 13,
  //     Q: 12,
  //     J: 11,
  //     T: 10,
  //     9: 9,
  //     8: 8,
  //     7: 7,
  //     6: 6,
  //     5: 5,
  //     4: 4,
  //     3: 3,
  //     2: 2,
  //   }

  //   // count char frequencies
  //   function countCharacterFrequencies(str) {
  //     const frequencyMap = {}
  //     for (let char of str) {
  //       frequencyMap[char] = (frequencyMap[char] || 0) + 1
  //     }
  //     return Object.values(frequencyMap).sort((a, b) => b - a)
  //   }

  //   // sort each type of hands list by their first value
  //   function sortList(list) {
  //     return list.sort((a, b) => {
  //       for (let i = 0; i < Math.min(a[0].length, b[0].length); i++) {
  //         if (a[0][i] !== b[0][i]) {
  //           return valueMap[b[0][i]] - valueMap[a[0][i]]
  //         }
  //       }
  //       return 0
  //     })
  //   }

  //   //sort into types of hands
  //   for (let hand of hands) {
  //     let occurances = countCharacterFrequencies(hand[0])
  //     if (occurances[0] == 5) {
  //       fiveOfAKind.push(hand)
  //     }
  //     if (occurances[0] == 4) {
  //       fourOfAKind.push(hand)
  //     }
  //     if (occurances[0] == 3 && occurances[1] == 2) {
  //       fullHouse.push(hand)
  //     }
  //     if (occurances[0] == 3 && occurances[1] == 1) {
  //       threeOfAKind.push(hand)
  //     }
  //     if (occurances[0] == 2 && occurances[1] == 2) {
  //       twoPair.push(hand)
  //     }

  //     if (occurances[0] == 2 && occurances[1] == 1) {
  //       onePair.push(hand)
  //     }

  //     if (occurances[0] == 1) {
  //       highCard.push(hand)
  //     }
  //   }

  //   const sortedFiveOfAKind = sortList(fiveOfAKind)
  //   const sortedFourOfAKind = sortList(fourOfAKind)
  //   const sortedFullHouse = sortList(fullHouse)
  //   const sortedThreeOfAKind = sortList(threeOfAKind)
  //   const sortedTwoPair = sortList(twoPair)
  //   const sortedOnePair = sortList(onePair)
  //   const sortedHighCard = sortList(highCard)
  //   let finalSortedList = sortedFiveOfAKind
  //     .concat(sortedFourOfAKind)
  //     .concat(sortedFullHouse)
  //     .concat(sortedThreeOfAKind)
  //     .concat(sortedTwoPair)
  //     .concat(sortedOnePair)
  //     .concat(sortedHighCard)
  //   finalSortedList.reverse()

  //   for (let i = 1; i <= ranks; i++) {
  //     counter = counter + finalSortedList[i - 1][1] * i
  //   }

  //   console.log(counter)
  //   return counter
  // }

  solvePart2() {
    //
    const cards = [
      'A',
      'K',
      'Q',
      'T',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
      'J',
    ]
    const handTypes = [
      'fiveOfAKind',
      'fourOfAKind',
      'fullHouse',
      'threeOfAKind',
      'twoPair',
      'onePair',
      'highCard',
    ]

    const getCardStrength = (card) => cards.indexOf(card)

    const evaluateHandType = (hand) => {
      const handArray = hand.cards.map((card) => [card, getCardStrength(card)])

      handArray.sort((a, b) => b[1] - a[1])

      if (handArray.some((card) => card[0] === 'J')) {
        return evaluateHandWithJoker(handArray)
      } else {
        return evaluateHandWithoutJoker(handArray)
      }
    }

    const evaluateHandWithJoker = (handArray) => {
      let bestHand = { type: 'highCard', cards: handArray }

      for (const card of cards) {
        if (card === 'J') continue

        const modifiedHand = handArray
          .map(([c, s]) => (c === 'J' ? [card, getCardStrength(card)] : [c, s]))
          .sort((a, b) => b[1] - a[1])
        const currentHand = evaluateHandWithoutJoker(modifiedHand)

        if (
          handTypes.indexOf(currentHand.type) < handTypes.indexOf(bestHand.type)
        ) {
          bestHand = currentHand
        }
      }

      return bestHand
    }

    const evaluateHandWithoutJoker = (handArray) => {
      handArray.sort((a, b) => b[1] - a[1])

      const cardCounts = handArray.reduce((counts, [_, strength]) => {
        counts[strength] = (counts[strength] || 0) + 1
        return counts
      }, {})

      const isFiveOfAKind = Object.values(cardCounts).includes(5)
      const isFourOfAKind = Object.values(cardCounts).includes(4)
      const isFullHouse =
        Object.values(cardCounts).includes(3) &&
        Object.values(cardCounts).includes(2)
      const isThreeOfAKind = Object.values(cardCounts).includes(3)
      const pairCount = Object.values(cardCounts).filter(
        (count) => count === 2,
      ).length

      if (isFiveOfAKind) return { type: 'fiveOfAKind', cards: handArray }
      if (isFourOfAKind) return { type: 'fourOfAKind', cards: handArray }
      if (isFullHouse) return { type: 'fullHouse', cards: handArray }
      if (isThreeOfAKind) return { type: 'threeOfAKind', cards: handArray }
      if (pairCount === 2) return { type: 'twoPair', cards: handArray }
      if (pairCount === 1) return { type: 'onePair', cards: handArray }

      return { type: 'highCard', cards: handArray }
    }

    const compareHands = (handA, handB) => {
      const typeA = evaluateHandType(handA)
      const typeB = evaluateHandType(handB)

      const typeIndexA = handTypes.indexOf(typeA.type)
      const typeIndexB = handTypes.indexOf(typeB.type)

      // compare hand types
      if (typeIndexA !== typeIndexB) {
        return typeIndexA < typeIndexB ? -1 : 1
      }

      // if hand types are the same, compare based on card strength
      for (let i = 0; i < handA.cards.length; i++) {
        const strengthA = getCardStrength(handA.cards[i])
        const strengthB = getCardStrength(handB.cards[i])
        if (strengthA !== strengthB) {
          return strengthA < strengthB ? -1 : 1
        }
      }
      return 0
    }

    const rankHands = (hands) => {
      const sortedHands = hands.sort(compareHands)
      sortedHands.forEach((hand, index) => {
        hand.rank = sortedHands.length - index
      })
      return sortedHands
    }

    const processInput = () => {
      const hands = this.lines
      const sortedHands = hands.map((hand) => {
        const [cards, bid] = hand.split(' ')
        if (cards != []) {
          return {
            cards: cards.split(''),
            bid: Number(bid),
          }
        }
      })
      const filteredHands = sortedHands.filter((a) => a !== undefined)
      const rankedHands = rankHands(filteredHands)

      return rankedHands
    }

    const hands = processInput()
    const total = hands.reduce((total, hand) => {
      return total + hand.bid * hand.rank
    }, 0)

    console.log(total)
    return total
  }
}

export default Day07
