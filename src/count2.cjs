const { format } = require('./util.cjs')
const { count, loadedAt } = require('@hankei6km/test-dual-package-hazard')

function printCountCjs() {
  console.log(format('count2.cjs', loadedAt(), count()))
  console.log(format('count2.cjs', loadedAt(), count()))
  console.log(format('count2.cjs', loadedAt(), count()))
  console.log(format('count2.cjs', loadedAt(), count()))
}

exports.printCountCjs = printCountCjs
