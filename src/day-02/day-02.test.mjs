import Problem from './day-02.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 02', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // remember to take out xit and change it to it
    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(8)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(2286)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(2278)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(67953)
    })
  })
})
