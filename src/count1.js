import { format } from './util.cjs'
import { count, loadedAt } from '@hankei6km/test-dual-package-hazard'
export function printCount() {
  console.log(format('count1.js', loadedAt(), count()))
  console.log(format('count1.js', loadedAt(), count()))
  console.log(format('count1.js', loadedAt(), count()))
  console.log(format('count1.js', loadedAt(), count()))
}
