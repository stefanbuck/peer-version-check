# peer-version-check [![Build Status](https://travis-ci.com/stefanbuck/peer-version-check.svg?branch=master)](https://travis-ci.com/stefanbuck/peer-version-check)

> Check whether every peerDependency is defined as a devDependency

As we all know, npm 3 changed to not install peerDependencies automatically. peerDependencies are still be useful and used by many package authors these days. 

As a package author it's quite anoying during development that peerDependencies are not installed automacily anymore. There is an open feature request in the yarn repostiroy to [allow install peerDependencies during development](https://github.com/yarnpkg/yarn/issues/1503).

Recently one of my colleague suggested me to add them as devDependencies. Obviously duplicating is not the best solution, but it works. However there is a risk that they can get out of sync easily. To solve this issue, I wrote this CLI which checks if every peerDependency is defined as a devDependency with the same semver range.

## Install

```
$ npm install peer-version-check
```


## Usage

### On travis-ci

```
before_script:
  npx peer-version-check
```

### Command line

```
$ peer-version-check <path-to-package.json> (optional)
```


## 	Example
```
$ peer-version-check ./package.json

Expected devDependency 'lodash' to be:
    ^4.0.0
Found:
    ^3.0.0
```

Exits with code 0 if every peerDependency is defined as a devDependency with the same semver range. If not exits with code 1 and an error message. 


## Related

[Common npm mistakes](https://medium.com/@jacob.h.page/common-npm-mistakes-51bf8989079f) - Excellent article to read


## License

MIT © [Stefan Buck](http://stefanbuck.com)
