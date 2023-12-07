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
    function isNumberInRange(number, lowerBound, upperBound) {
      return number >= lowerBound && number <= upperBound
    }

    let seedLocations = []
    const listOfSeeds = this.lines[0].split(': ')[1].split(' ')
    let mappingList = createMaps(this.lines.slice(2, this.lines.length))
    for (let seed of listOfSeeds) {
      for (let key in mappingList) {
        for (let value of mappingList[key]) {
          let numberInRangeStatus = isNumberInRange(
            parseInt(seed),
            value[1],
            value[1] + value[2],
          )
          if (numberInRangeStatus) {
            seed = parseInt(seed) + (value[0] - value[1])
            break
          }
        }
      }
      seedLocations.push(seed)
    }
    let numericValues = seedLocations.map(Number)
    let smallestValue = Math.min(...numericValues)
    console.log('The smallest value is:', smallestValue)
    //seed to soil seed 13
    // seed goes to 13 if it isnt within the starting range of the source range (1)
    // so soil destination is 13
    // soil to fertilizer finds it within the range of the source range , and if so, adds the value of its original source to the destination so 52 (13+39)
    // fertilizer to water - so I start with 52 and it's within the range of 11-42, so I subtract 11 since that's the difference between the source and destination
    //so 52-11 gets me for 41 water
    //if my water is 41, for water to light, water is within range of 25-70, so 41-7 = 34 for my light
    // 34 for light to temp
    // 34 is not within the starting range of any of the temps so we will go with the original number
    // so i have 34 for temp
    // temp to humidity, i have temp of 34 and it fits within range starting at 0, the diff is 1 so I add one so the range its humidity is 35
    // 35 humidity doesnt fit in the range for any of humidity to locations maps, so it will remain the same number (35)
    // result is 35?

    // first step is to see if it meets the conditional to either remain its value or to have its value changed.
    // the condition is if it's within any of the ranges of the starting source value + range, if so, apply the difference between source value -> destination value (destination-source = value we apply to previous derived number from previous map)
    // continue with this logic until we get the resulting location and append it to a list.

    return smallestValue
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day05
