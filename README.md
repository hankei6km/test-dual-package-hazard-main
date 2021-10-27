# test-dual-package-hazard-main

[Dual package hazard](https://nodejs.org/api/packages.html#dual-package-hazard) を体験する。

## 問題のあるモジュール

[test-dual-package-hazard](https://github.com/hankei6km/test-dual-package-hazard) モジュールは[Approach #2: Isolate state](https://nodejs.org/api/packages.html#approach-2-isolate-state)を意識して `main` と `exports` が定義されている。

```json
  "main": "dist/index.cjs",
  "exports": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
```

しかし、`.cjs` は ESM 用のソースを単純に変換しただけで、ESM 側のステータスを共有するようにはなっていない。

## 問題を表面化させる読み込み

上記モジュールを他のモジュールから `import` と `require` で読み込んで利用する。

```javascript
// src/count1.js and src/count2.js
import { count, loadedAt } from '@hankei6km/test-dual-package-hazard'
```

```javascript
// src/count1.cjs and src/count2.cjs
const { count, loadedAt } = require('@hankei6km/test-dual-package-hazard')
```

```javascript
// main.js
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
```

## 結果

`import` と `require` のどちらも `@hankei6km/test-dual-package-hazard` を読み込んでいるが、その方法によってステータス(インスタンス)が異なる状態になる。


```console
$ npm run start
count1.js ---- 
from: count1.js loadedAt: 2021-10-26T07:06:31.874Z count: 0
from: count1.js loadedAt: 2021-10-26T07:06:31.874Z count: 1
from: count1.js loadedAt: 2021-10-26T07:06:31.874Z count: 2
from: count1.js loadedAt: 2021-10-26T07:06:31.874Z count: 3
count1.cjs ---- 
from: count1.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 0
from: count1.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 1
from: count1.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 2
from: count1.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 3
count2.js ---- 
from: count2.js loadedAt: 2021-10-26T07:06:31.874Z count: 4
from: count2.js loadedAt: 2021-10-26T07:06:31.874Z count: 5
from: count2.js loadedAt: 2021-10-26T07:06:31.874Z count: 6
from: count2.js loadedAt: 2021-10-26T07:06:31.874Z count: 7
count2.cjs ---- 
from: count2.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 4
from: count2.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 5
from: count2.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 6
from: count2.cjs loadedAt: 2021-10-26T07:06:31.878Z count: 7
```

なお、今回は native ESM の javascript コードで実施しているが、`import` が `require` に変換される環境では表面化しない。


## ライセンス

MIT License

Copyright (c) 2021 hankei6km

