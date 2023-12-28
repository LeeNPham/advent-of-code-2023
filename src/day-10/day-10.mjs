import Problem from '../_lib/problem.mjs'

const Ordinals = {
  north: 'north',
  east: 'east',
  south: 'south',
  west: 'west',
  start: 'start',
}

let counter = 0

class Day10 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    // hello world
    const grid = new Grid(this.lines)
    const start = grid.testStartingPoint()
    const startingCoordinates = [start.x, start.y]
    let leftPointer = startingCoordinates
    let rightPointer = startingCoordinates
    let counter = 0
    let rowLength = this.lines[0].split('').length
    let columnHeight = this.lines.length - 1
    // console.log({ rowLength, columnHeight })
    console.log(startingCoordinates)
    const lines = this.lines
    let matrix = lines
    matrix.pop()
    let finalGrid = matrix.map(function (a) {
      return a.split('')
    })

    console.log(finalGrid)

    const mapDirections = {
      '|': ['north', 'south'],
      '-': ['west', 'east'],
      L: ['north', 'east'],
      J: ['north', 'west'],
      7: ['south', 'west'],
      F: ['south', 'east'],
    }

    // check to see which of the startingCoordinates work, and create an list of lists [[x1,y1],[x2,y2]]
    let startingCheckCoordinates = []
    // checks north
    if (startingCoordinates[1] >= 1) {
      let northCoordinate = [startingCoordinates[0], startingCoordinates[1] - 1]
      console.log({ northCoordinate })
      let northSymbol = finalGrid[northCoordinate[1]][northCoordinate[0]]
      console.log(northSymbol)
      if (northSymbol == '|' || northSymbol == '7' || northSymbol == 'F') {
        startingCheckCoordinates.push([northCoordinate[0], northCoordinate[1]])
      }
    }

    // checks south
    if (startingCoordinates[1] <= columnHeight) {
      let southCoordinate = [startingCoordinates[0], startingCoordinates[1] + 1]
      console.log({ southCoordinate })
      let southSymbol = finalGrid[southCoordinate[1]][southCoordinate[0]]
      console.log(southSymbol)
      if (southSymbol == '|' || southSymbol == 'L' || southSymbol == 'J') {
        startingCheckCoordinates.push([southCoordinate[0], southCoordinate[1]])
      }
    }

    // checks east
    // change x value to be -1 if z >=1

    // checks west
    // change x value to be +1 if z < rowLength

    console.log({ startingCheckCoordinates })
    // for (let i = 0; i < matrix.length; i++) {}

    /**
     * 1. Find the starting position
     *
     * 2. Identify loop based off of cardinal directions from starting position.
     *  - There's only 4 directions on a starting position, two of them must be a loop
     *  - There's only ever one loop
     *    - If we find it on our first try we're done
     *    - Otherwise we must test another position, if it is not a loop then we know the last two are a loop.
     *    - We will always be able to identify our loop by our third iteration
     *
     * 3. We need to find the furthest point in a loop.
     *  - We can simply keep track of the loop length.
     *  - Then we can take the length and divide it by 2
     */

    return 0
    // return grid.findLoopLength()
  }

  // solvePart2() {
  //   return parseInt(this.solvePart1())
  // }
}

export default Day10

/**
 * Grid will contain cells
 * Grid needs a way to search all cells for the starting cell
 * Once a starting cell is found, recursively start building out a path,
 * Any invalid paths then bubble up invalidating a potential path
 * Otherwise once recursively crawling until we find the ending point we have then found our loop
 *
 * The grid will keep track of valid checks and an ongoing loop?
 */

class Grid {
  // # represents a private property, we don't need to have let or const because it's used as something only in this class
  #startingCharacter = 'S'
  /** @type {Cell[][]} */
  #cells
  /** @type {Record<string, string[]>} */
  #mapDirections = {
    '|': ['north', 'south'],
    '-': ['west', 'east'],
    L: ['north', 'east'],
    J: ['north', 'west'],
    7: ['south', 'west'],
    F: ['south', 'east'],
    S: ['north', 'south', 'east', 'west'],
  }

  /**
   * @param {string[]} lines
   */
  constructor(lines) {
    this.#cells = lines.map((line, y) =>
      line.split('').map((character, x) => new Cell(character, x, y, this)),
    )
  }

  get(x, y) {
    return this.#cells.at(y)?.at(x)
  }

  height() {
    return this.#cells.length
  }

  width() {
    return this.#cells.at(0).length
  }

  findLoopLength() {
    return this.#findLoop().length
  }

  #findLoop() {
    const startingPoint = this.#findStartingPoint()

    if (startingPoint === undefined) {
      throw new Error('Starting Point Not Found')
    }

    const chain = []

    return this.#traverse(startingPoint, chain, Ordinals.start)
  }

  /**
   * @param {Cell} cell
   * @param {Cell[]} chain
   * @param {string} cameFromDirection
   * @returns {Cell[]}
   * */

  #traverse(cell, chain, cameFromDirection) {
    counter++
    if (counter > 10) throw new Error('TOOOO MANY!')
    /**
     *  Do we need to know the direction we came from since it should not be considered a valid route -- YES
     *  Or do we feed it the directions to check hrmmmm
     *  i think if we make a map then we're good to feed it directions
     * OOH yeah we only have one in and one out per square depending on the current character value 👍
     * we just need to follow and check if it's valid
     */
    /**
     * mapDirections = {
     * |:['north', 'south'],
     * -:['west','east'],
     * L:['north','east'],
     * J:['north','west'],
     * 7:['south','west'],
     * F:['south','east'],
     * S: ['north','south','east','west']
     * }
     *
     *
     * . . . S L
     * . . . L O
     *
     * [startingCell, nextConnectingCell, soOn, ... ]
     */

    /**
     * 0 1 2 3 4 5 6
     * E N E N E S S
     *  ╗═╔╗═
        .╔╝║╗
        S╝╚╚╗
        ║╔══╝
        ╚╝.╚╝

      * came from the west, north is not an option
      * but south is
     */

    const north = cell.up()
    const east = cell.right()
    const south = cell.down()
    const west = cell.left()

    // Check North
    if (
      cameFromDirection != Ordinals.south &&
      this.#mapDirections[north.value].includes(Ordinals.south)
    ) {
      console.log('North Works')
      return this.#traverse(north, [...chain, north], Ordinals.south)
    }

    // Check East
    if (
      cameFromDirection != Ordinals.west &&
      this.#mapDirections[east.value].includes(Ordinals.west)
    ) {
      console.log('East Works')
      return this.#traverse(east, [...chain, east], Ordinals.west)
    }

    // Check South
    if (
      cameFromDirection != Ordinals.north &&
      this.#mapDirections[south.value].includes(Ordinals.north)
    ) {
      console.log('South Works')
      return this.#traverse(south, [...chain, south], Ordinals.north)
    }

    // Check West
    if (
      cameFromDirection != Ordinals.east &&
      this.#mapDirections[west.value].includes(Ordinals.east)
    ) {
      console.log('West Works')
      return this.#traverse(west, [...chain, west], Ordinals.east)
    }

    if (
      north.value == 'S' ||
      east.value == 'S' ||
      south.value == 'S' ||
      west.value == 'S'
    ) {
      console.log('FOUND IT!!!')
      return chain
    }

    console.log('NOPE.jpg')

    /**
     * From a cell check up, down, left, right if there are any valid connections, any valid connections recursively
     *
     * Lee: Can we just make 3 variables (leftStart, rightStart, and positionIndex)
     * we look for 2 valid connections, one which is set as leftStart and the other as rightStart
     * we then give those valid connections the number 1 for its positionIndex
     * we continue on checking to see where we already came from since we can't consider that one to be our next connection
     * and we look to see where the next connection is, which is based on current pipes orientation.
     * This would mean we might want a map to tell us where which direction to go since there will only be 2 options,
     * and it wont be our previous indexes position.
     */
  }

  // this is a private property that's a function? so then can private properties be both class functions and attributes?
  #findStartingPoint() {
    return this.#cells
      .flat()
      .find((cell) => cell.value == this.#startingCharacter)
  }

  testStartingPoint() {
    return this.#findStartingPoint()
  }
}

class Cell {
  value
  x
  y
  #grid

  /**
   * @param {string} character
   * @param {number} x
   * @param {number} y
   * @param {Grid} grid
   */
  constructor(character, x, y, grid) {
    this.value = character
    this.x = x
    this.y = y
    this.#grid = grid
  }

  up() {
    if (this.y == 0) return undefined

    return this.#grid.get(this.y - 1, this.x)
  }

  down() {
    if (this.y + 1 == this.#grid.height) return undefined

    return this.#grid.get(this.y + 1, this.x)
  }

  left() {
    if (this.x == 0) return undefined

    return this.#grid.get(this.y, this.x - 1)
  }

  right() {
    if (this.x + 1 == this.#grid.width) return undefined

    return this.#grid.get(this.y, this.x + 1)
  }

  /**
   * @param {Cell} cell
   */
  equals(cell) {
    return cell.x == this.x && cell.y == this.y
  }
}
