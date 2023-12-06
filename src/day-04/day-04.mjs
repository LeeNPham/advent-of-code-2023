import Problem from '../_lib/problem.mjs'

class Day04 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    //we create two lists that contain lists. The first list will be the winning numbers, the second will be the card numbers you have
    //then we use sort/filter js function find matching integers from each corresponding list
    //the total number of matching integers will be "n" the score will be added with an if else statement where if n==1, then total score =+1 else if
    // n>2, then totalscore =+ 2^n-1

    let count = 0

    for (let line of this.lines) {
      if (line) {
        let tempCounter = 0
        let bothLines = line.split(' | ')
        let leftLine = bothLines[0]
          .split(': ')[1]
          .split(' ')
          .filter((str) => str.trim() !== '')
        let rightLine = bothLines[1]
          .split(' ')
          .filter((str) => str.trim() !== '')
        // console.log({ 'winning numbers': leftLine, 'my numbers': rightLine })

        // go through winning numbers to add to temp counter for each line.
        for (let winningNumber of leftLine) {
          if (rightLine.includes(winningNumber)) {
            tempCounter++
          }
        }
        // console.log(' TEMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP', tempCounter)

        if (tempCounter > 1) {
          count = count + 2 ** (tempCounter - 1)
          tempCounter = 0
        }
        if (tempCounter == 1) {
          count = count + 1
          tempCounter = 0
        } else {
          tempCounter = 0
        }
      }
    }
    // console.log('this is COUNTTTTTTTT', count)
    return count
  }

  solvePart2() {
    let cardSets = {}
    for (let line in this.lines) {
      if (parseInt(line) < this.lines.length - 1) {
        cardSets[(parseInt(line) + 1).toString()] = 1
      }
    }

    let currentCard = 0

    for (let line of this.lines) {
      currentCard++
      if (line) {
        let tempCounter = 0
        let bothLines = line.split(' | ')
        let leftLine = bothLines[0]
          .split(': ')[1]
          .split(' ')
          .filter((str) => str.trim() !== '')
        let rightLine = bothLines[1]
          .split(' ')
          .filter((str) => str.trim() !== '')
        // console.log({ 'winning numbers': leftLine, 'my numbers': rightLine })

        // go through winning numbers to add to tempCounter for each line.
        for (let winningNumber of leftLine) {
          if (rightLine.includes(winningNumber)) {
            tempCounter++
          }
        }

        for (let i = currentCard + 1; i <= currentCard + tempCounter; i++) {
          cardSets[i.toString()] = parseInt(cardSets[i]) + cardSets[currentCard]
        }
        // console.log('NEW CARDSET', cardSets)
        // let res = 0
        // for (let key in cardSets) {
        //   res = res + cardSets[key]
        // }
        // console.log('RESULTTTTTTTTTTTTTTTTT?', res)
      }
    }
    // console.log('this is COUNTTTTTTTT', count)
    function getCards(cardSets) {
      const values = Object.values(cardSets)
      const sum = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )
      return sum
    }

    let totalCards = getCards(cardSets)
    console.log('this is the totaaaaal cards', totalCards)
    return totalCards
  }
}

export default Day04
