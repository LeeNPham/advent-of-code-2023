import Problem from '../_lib/problem.mjs'

class Day06 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   let lines = this.lines
  //   let timeDistanceList = []
  //   let finalList = []
  //   let ans = []
  //   const regex = /-?\d+(\.\d+)?/g
  //   for (let line of lines) {
  //     let response = line.match(regex)
  //     if (response) {
  //       timeDistanceList.push(response)
  //     }
  //   }

  //   for (let i = 0; i < timeDistanceList[0].length; i++) {
  //     // console.log(i)
  //     finalList.push([
  //       parseInt(timeDistanceList[0][i]),
  //       parseInt(timeDistanceList[1][i]),
  //     ])
  //   }
  //   // console.log({ finalList })

  //   function ways(t, d) {
  //     let count = 0
  //     for (let index = 0; index < t; index++) {
  //       // Hold down for i seconds
  //       if ((t - index) * index > d) {
  //         count += 1
  //       }
  //     }
  //     return count
  //   }

  //   for (const [t, d] of finalList) {
  //     ans.push(ways(t, d))
  //   }

  //   let p = 1

  //   for (let x of ans) {
  //     p = p * x
  //   }

  //   console.log(p)
  //   return p
  // }

  solvePart2() {
    let lines = this.lines
    let timeDistanceList = []
    let ans = []
    const regex = /-?\d+(\.\d+)?/g
    for (let line of lines) {
      let response = line.match(regex)
      if (response) {
        timeDistanceList.push(response.join(''))
      }
    }
    console.log({ timeDistanceList })

    function ways(t, d) {
      let count = 0
      for (let index = 0; index < t; index++) {
        if ((t - index) * index > d) {
          count += 1
        }
      }
      return count
    }

    ans.push(ways(timeDistanceList[0], timeDistanceList[1]))

    let p = 1

    for (let x of ans) {
      p = p * x
    }

    console.log(p)
    return p
  }
}

export default Day06
