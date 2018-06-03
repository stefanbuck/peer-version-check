const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const cli = path.join(__dirname, '../cli.js');
const fixtures = path.join(__dirname, 'fixtures');

function run(file) {
  console.log(file);
  return new Promise(resolve => {
    cp.execFile(cli, [file], (error, stdout) => {
      resolve({
        exitCode: (error && error.code) || 0,
        stdout: stdout.toString()
      });
    });
  });
}

const fixutres = fs.readdirSync(fixtures);
const jsonFiles = fixutres
  .filter(name => path.extname(name) === '.json');

jsonFiles.forEach(file => {
  const name = file.replace(/_/g, ' ').replace('.json', '');
  it(name, async () => {
    const out = await run(path.join(fixtures, file));
    expect(out).toMatchSnapshot();
  });
});
