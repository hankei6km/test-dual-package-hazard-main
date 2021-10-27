#!/usr/bin/env node
import{ format } from './util.cjs'
import { count as count1, loadedAt as loadedAt1 } from './count1.js'
import { count as count2, loadedAt as loadedAt2 } from './count2.js'
import { count as count3, loadedAt as loadedAt3 } from './count3.cjs'
import { count as count4, loadedAt as loadedAt4 } from './count3.cjs'

console.log(`count1 === count2 ${count1 === count2}`)
console.log(`count2 === count3 ${count2 === count3}`)
console.log(`count3 === count4 ${count3 === count4}`)

console.log('')
console.log(format('count1', loadedAt1(), count1()))
console.log(format('count2', loadedAt2(), count2()))
console.log(format('count3', loadedAt3(), count3()))
console.log(format('count4', loadedAt4(), count4()))