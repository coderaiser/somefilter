# somefilter [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Right-to-left conditional function composition. Get [some][someURL] result of [filter][filterURL] functions call.

## Install

```
npm i somefilter --save
```

## How to use?

```js
const somefilter = require('somefilter');
const notEmpty = ({length} = 0) => length;
const find = (array, condition) => array.filter(condition);

const findZero = array => find(array, a => !a);
const findPositive = array => find(array, a => a > 0);

const findNumbers = somefilter(notEmpty, [findPositive, findZero]);

findNumbers([1, 2, -1, -3]);
// returns
[1, 2];

findNumbers([1, 2, -1, -3, 0, 0, 0]);
// returns
[0, 0, 0];
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/somefilter.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/somefilter/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/somefilter.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/somefilter "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/somefilter  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/somefilter "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/somefilter?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/somefilter/badge.svg?branch=master&service=github

[someURL]:                  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[filterURL]:                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
