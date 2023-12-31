import Problem from './day-05.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 05', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(35)
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(46)
    // })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(579439039)
    // })

    // not this number
    //7873085??????????
    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(7873084)
    // })
  })
})
