import Problem from '../_lib/problem.mjs'

class Day05 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    function createMaps(data) {
      const maps = {}
      let currentMapName = ''
      for (const line of data) {
        if (line.endsWith('map:')) {
          currentMapName = line.slice(0, -5) // Remove ' map:' from the title
          maps[currentMapName] = []
        } else if (line.trim()) {
          maps[currentMapName].push(line.split(' ').map(Number))
        }
      }
      return maps
    }

    let seedLocations = []
    const listOfSeeds = this.lines[0].split(': ')[1].split(' ')
    const mappingList = createMaps(this.lines.slice(2, this.lines.length))
    for (let seed of listOfSeeds) {
      for (let key in mappingList) {
        for (let value of mappingList[key]) {
          if (
            parseInt(seed) >= value[1] &&
            parseInt(seed) <= value[1] + value[2]
          ) {
            seed = parseInt(seed) + (value[0] - value[1])
            break
          }
        }
      }
      seedLocations.push(seed)
    }

    let smallestValue = Math.min(...seedLocations.map(Number))
    // console.log('The smallest value is:', smallestValue)
    return smallestValue
  }

  solvePart2() {
    function createMaps(data) {
      const maps = {}
      let currentMapName = ''
      for (const line of data) {
        if (line.endsWith('map:')) {
          currentMapName = line.slice(0, -5) // Remove ' map:' from the title
          maps[currentMapName] = []
        } else if (line.trim()) {
          maps[currentMapName].push(line.split(' ').map(Number))
        }
      }
      return maps
    }

    let seedLocations = []
    let pairsOfSeeds = []
    let listOfSeedsAfterPairing = []
    const listOfSeeds = this.lines[0].split(': ')[1].split(' ')
    const mappingList = createMaps(this.lines.slice(2, this.lines.length))

    for (let i = 0; i < listOfSeeds.length; i += 2) {
      if (listOfSeeds[i + 1] !== undefined) {
        pairsOfSeeds.push([listOfSeeds[i], listOfSeeds[i + 1]])
      } else {
        pairsOfSeeds.push([listOfSeeds[i]])
      }
    }

    for (let setOfSeeds of pairsOfSeeds) {
      for (
        let start = parseInt(setOfSeeds[0]);
        start <= parseInt(setOfSeeds[1]) + parseInt(setOfSeeds[0]);
        start++
      ) {
        listOfSeedsAfterPairing.push(start)
      }
    }

    for (let seed of listOfSeedsAfterPairing) {
      for (let key in mappingList) {
        for (let value of mappingList[key]) {
          if (
            parseInt(seed) >= value[1] &&
            parseInt(seed) <= value[1] + value[2]
          ) {
            seed = parseInt(seed) + (value[0] - value[1])
            break
          }
        }
      }
      seedLocations.push(seed)
    }

    let smallestValue = Math.min(...seedLocations.map(Number))
    console.log('The smallest value is:', smallestValue)
    return smallestValue
  }
}

export default Day05
