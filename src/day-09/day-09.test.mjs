import Problem from './day-09.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 09', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(114)
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(2)
    // })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(1762065988)
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(1066)
    // })
  })
})
