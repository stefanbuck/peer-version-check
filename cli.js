#!/usr/bin/env node
'use strict';

const meow = require('meow');
const init = require('./src/peer-version-check');

const cli = meow(`
	Usage
	  $ peer-version-check <path-to-package.json>
 
	Example
    $ peer-version-check ./package.json

    Expected devDependency 'lodash' to be:
        ^4.0.0
    Found:
        ^3.0.0
   
  Exits with code 0 if every peerDependency is defined as a devDependency with the same semver range. If not exits with code 1 and an error message. 
`);

init(cli.input[0]);
