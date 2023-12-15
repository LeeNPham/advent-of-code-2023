import Problem from '../_lib/problem.mjs'

class Day08 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let networkMap = {}
    const directions = this.lines[0]
    console.log({ directions })

    const direction = (i) => {
      let effectiveIndex = i % directions.length
      return directions[effectiveIndex]
    }

    const network = this.lines.splice(2, this.lines.length - 3)
    network.map(
      (str) =>
        (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
    )
    console.log({ networkMap })

    let i = 0
    let foundTarget = false
    let currentPlace = 'AAA'
    let currentTarget = 'ZZZ'
    // use a recursive function where it loops through the network map, with a breakCase where target = 'ZZZ'
    while (foundTarget == false) {
      if (currentPlace !== currentTarget) {
        // change value of currentPlace based on the i (which is either the left or right value which is the next key)
        currentPlace = networkMap[currentPlace][direction(i) == 'L' ? 0 : 1]
        i++
      } else {
        foundTarget = true
      }
    }
    console.log(i)
    return i
  }

  solvePart2() {
    let networkMap = {}

    const network = this.lines.splice(2, this.lines.length - 3)
    network.map(
      (str) =>
        (networkMap[str.slice(0, 3)] = [str.slice(7, 10), str.slice(12, 15)]),
    )
    console.log({ networkMap })

    const startingNodes = Object.keys(networkMap).filter((node) =>
      node.endsWith('A'),
    )

    // console.log({ startingNodes   })

    function navigate(nodes, networkMap, left) {
      return nodes.map((node) => networkMap[node][left ? 0 : 1])
    }

    function findStepsToAllZ(networkMap, startingNodes) {
      let currentNodes = startingNodes
      let steps = 0
      let left = true

      while (!currentNodes.every((node) => node.endsWith('Z'))) {
        currentNodes = navigate(currentNodes, networkMap, left)
        left = !left
        steps++
      }

      return steps
    }

    const stepsToAllZ = findStepsToAllZ(networkMap, startingNodes)
    console.log("Number of steps to reach all 'Z'  nodes:", stepsToAllZ)
    return stepsToAllZ
  }
}

export default Day08
