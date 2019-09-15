[![npm version](https://img.shields.io/npm/v/@danieldietrich/github-license?logo=npm&style=flat-square)](https://www.npmjs.com/package/@danieldietrich/github-license/)[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@danieldietrich/github-license?style=flat-square)](https://snyk.io/test/npm/@danieldietrich/github-license)[![minzipped size](https://img.shields.io/bundlephobia/minzip/@danieldietrich/github-license?style=flat-square)](https://bundlephobia.com/result?p=@danieldietrich/github-license@latest)![types](https://img.shields.io/npm/types/typescript?style=flat-square)[![license](https://img.shields.io/github/license/danieldietrich/github-license?style=flat-square)](https://opensource.org/licenses/MIT/)
&nbsp;
[![build](https://img.shields.io/travis/danieldietrich/github-license?logo=github&style=flat-square)](https://travis-ci.org/danieldietrich/github-license/)[![coverage](https://img.shields.io/codecov/c/github/danieldietrich/github-license?style=flat-square)](https://codecov.io/gh/danieldietrich/github-license/)
&nbsp;
[![donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?logo=paypal&style=flat-square)](https://paypal.me/danieldietrich13)[![patrons](https://img.shields.io/liberapay/patrons/danieldietrich?style=flat-square)](https://liberapay.com/danieldietrich/)
&nbsp;
[![Follow](https://img.shields.io/twitter/follow/danieldietrich?label=Follow&style=social)](https://twitter.com/danieldietrich/)

# github-license

Downloads an open source license text by calling the [GitHub Licenses REST API v3](https://developer.github.com/v3/licenses). The argument is a [SPDX license id](#spdx-license-id) supported by GitHub. If omitted, a list of supported licenses is loaded. The public GitHub API has a [rate limit](https://developer.github.com/v3/#rate-limiting) of up to 60 requests per hour. You may want to cache licenses using [@danieldietrich/async-memoize](https://www.npmjs.com/package/@danieldietrich/async-memoize).

Features:

* Load a list of available licenses
* Load a specific license

There exists also the command line client [github-license-cli](https://npmjs.com/@danieldietrich/github-license-cli).

## Installation

```bash
npm i @danieldietrich/github-license
```

## Usage

The module supports ES6 _import_ and CommonJS _require_ style.

```ts
import githubLicense from '@danieldietrich/github-license';

async function example() {

    // load supported licenses
    const licenses = await githubLicense();
    console.log(licenses);

    // load MIT license text
    const license = await githubLicense('MIT');
    console.log(license);
}

example();

// gracefully wait some secs
setTimeout(() => {}, 3210);
```

## SPDX License ID

The list of supported licenses is a string, one license per row: <tt>&lt;SPDX Identifier> '\t' &lt;License Name></tt>.

```
AGPL-3.0    GNU Affero General Public License v3.0
Apache-2.0  Apache License 2.0
BSD-2-Clause        BSD 2-Clause "Simplified" License
BSD-3-Clause        BSD 3-Clause "New" or "Revised" License
EPL-2.0     Eclipse Public License 2.0
GPL-2.0     GNU General Public License v2.0
GPL-3.0     GNU General Public License v3.0
LGPL-2.1    GNU Lesser General Public License v2.1
LGPL-3.0    GNU Lesser General Public License v3.0
MIT MIT License
MPL-2.0     Mozilla Public License 2.0
Unlicense   The Unlicense
```

## Example: MIT License

```
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Error handling

There are two error sources: the Node.js [https](https://nodejs.org/api/https.html) call and the [GitHub Licenses REST API v3](https://developer.github.com/v3/licenses/). If something goes wrong, the promise is rejected with an Error.

Common errors are:

| Error | Reason |
| --- | --- |
| <tt>Error('403')</tt> | The GitHub API [rate limit](https://developer.github.com/v3/#rate-limiting) is exceeded. |
| <tt>Error('404')</tt> | The SPDX short identifier isn't supported by the GitHub Licenses API. |
| <tt>Error('Request path contains unescaped characters')</tt> | The given SPDX identifier contains invalid url path characters. Valid SPDX identifiers consist of `[a-zA-Z0-9.-]`. |
| <tt>Error('getaddrinfo ENOTFOUND api.github.com api.github.com:443')</tt> | There is no internet connection. |

---

Copyright &copy; 2019 by [Daniel Dietrich](cafebab3@gmail.com). Released under the [MIT](https://opensource.org/licenses/MIT/) license.
