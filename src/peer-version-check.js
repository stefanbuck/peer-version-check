const fs = require('fs');
const path = require('path');
const {red, green} = require('chalk');
const isEqual = require('lodash.isequal');
const transform = require('lodash.transform');

function diffString(name, expectedVersion, receivedVersion) {
  return (
    `Expected devDependency '${name}' to be:\n` +
    `   ${green(expectedVersion)}\n` +
    'Found:\n' +
    `   ${red(receivedVersion)}\n`
  );
}

function findDifferences(base, object) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base && base[key])) {
      result[key] = value;
    }
  });
}

function check(devDependencies, peerDependencies) {
  const result = findDifferences(devDependencies, peerDependencies);

  if (Object.keys(result).length > 0) {
    const out = Object.entries(result).map(([name]) => {
      return diffString(
        name,
        peerDependencies[name],
        devDependencies && devDependencies[name]
      );
    });

    return out.join('\n');
  }

  return null;
}

const defaultPkg = path.join(process.cwd(), 'package.json');

module.exports = function (pkgPath = defaultPkg) {
  const content = fs.readFileSync(pkgPath).toString();
  const json = JSON.parse(content);

  if (!json.peerDependencies) {
    process.exit(0);
  }

  const out = check(json.devDependencies, json.peerDependencies);

  if (!out) {
    process.exit(0);
  }

  console.log(out);
  process.exit(1);
};
