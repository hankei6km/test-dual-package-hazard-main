#!/usr/bin/env node
import { printCount as printCount1 } from './count1.js'
import { printCount as printCount2 } from './count2.js'
import { printCountCjs as printCountCjs1 } from './count1.cjs'
import { printCountCjs as printCountCjs2 } from './count2.cjs'

console.log('count1.js ---- ')
printCount1()
console.log('count1.cjs ---- ')
printCountCjs1()
console.log('count2.js ---- ')
printCount2()
console.log('count2.cjs ---- ')
printCountCjs2()
