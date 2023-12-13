import Problem from './day-07.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 07', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(6440)
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(5905)
    // })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe(248569531)
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(250382098)
    // })
  })
})
