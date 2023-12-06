import 'zx/globals'

const day = await question('What day number would you like to create? ')
const baseDirectory = './src/day-00'
const newDirectory = './src/day-' + day
const extension = 'mjs'

// await $`cp -r ${baseDirectory} ${newDirectory}`
await fs.copy(baseDirectory, newDirectory)

await Promise.all([
  fs.move(
    `${newDirectory}/day-00.${extension}`,
    `${newDirectory}/day-${day}.${extension}`,
  ),
  fs.move(
    `${newDirectory}/day-00.test.${extension}`,
    `${newDirectory}/day-${day}.test.${extension}`,
  ),
  // $`mv ${newDirectory}/day-00.${extension} ${newDirectory}/day-${day}.${extension}`,
  // $`mv ${newDirectory}/day-00.test.${extension} ${newDirectory}/day-${day}.test.${extension}`,
])

cd(newDirectory)
await $`npx rexreplace 'Day 00' 'Day ${day}/' *`
await $`npx rexreplace 'Day00' 'Day${day}' *`
await $`npx rexreplace 'day-00' 'day-${day}' *`

console.log(`Finished creating: Day ${day} at ${newDirectory}`)
