import Problem from '../_lib/problem.mjs'

class Day09 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   const histories = this.lines
  //     .filter((x) => x != '')
  //     .map((s) => s.split(' ').map((n) => parseInt(n)))
  //   console.log({ histories })

  //   function calculateNextValue(history) {
  //     let sequences = [history]
  //     // Generate sequences of differences until all elements in the last sequence are zero
  //     while (
  //       sequences[sequences.length - 1].some((val, _, arr) => val !== arr[0]) ||
  //       sequences[sequences.length - 1][0] !== 0
  //     ) {
  //       let sequence = []
  //       for (let i = 0; i < sequences[sequences.length - 1].length - 1; i++) {
  //         sequence.push(
  //           sequences[sequences.length - 1][i + 1] -
  //             sequences[sequences.length - 1][i],
  //         )
  //       }
  //       sequences.push(sequence)
  //     }
  //     // Calculate the next value
  //     for (let i = sequences.length - 1; i > 0; i--) {
  //       sequences[i].push(sequences[i][sequences[i].length - 1])
  //       sequences[i - 1].push(
  //         sequences[i - 1][sequences[i - 1].length - 1] +
  //           sequences[i][sequences[i].length - 1],
  //       )
  //     }
  //     return sequences[0][sequences[0].length - 1]
  //   }

  //   function sumOfExtrapolatedValues(histories) {
  //     return histories.reduce(
  //       (acc, history) => acc + calculateNextValue(history),
  //       0,
  //     )
  //   }

  //   return sumOfExtrapolatedValues(histories)
  // }

  solvePart2() {
    const histories = this.lines
      .filter((x) => x != '')
      .map((s) => s.split(' ').map((n) => parseInt(n)))

    function calculatePreviousValue(history) {
      let sequences = [history]
      // Generate sequences of differences until all elements in the last sequence are zero
      while (
        sequences[sequences.length - 1].some((val, _, arr) => val !== arr[0]) ||
        sequences[sequences.length - 1][0] !== 0
      ) {
        let sequence = []
        for (let i = 0; i < sequences[sequences.length - 1].length - 1; i++) {
          sequence.push(
            sequences[sequences.length - 1][i + 1] -
              sequences[sequences.length - 1][i],
          )
        }
        sequences.push(sequence)
      }

      // Calculate the previous value
      sequences.reverse().forEach((seq, i) => {
        if (i > 0) {
          seq.unshift(seq[0] - sequences[i - 1][0])
        }
      })

      return sequences[sequences.length - 1][0]
    }

    function sumOfExtrapolatedPreviousValues(histories) {
      return histories.reduce(
        (acc, history) => acc + calculatePreviousValue(history),
        0,
      )
    }

    // console.log(sumOfExtrapolatedPreviousValues(histories))
    return sumOfExtrapolatedPreviousValues(histories)
  }
}

export default Day09
