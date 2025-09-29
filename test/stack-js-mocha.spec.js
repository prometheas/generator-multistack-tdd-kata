const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const os = require('os');
const shell = require('shelljs');

describe('js-mocha kata stack', function () {
  const tempTestingDir = path.join(os.tmpdir(), './temp-test');

  it('installs the correct files', async function () {
    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-mocha',
      });

    assert.file([
      'README.md',
      'src/StringCalculator.js',
      'test/StringCalculator.spec.js',
      'package.json',
      '.gitignore',
      '.jshintrc',
    ]);
  });

  it('can properly run a failing test after installation', async function () {
    this.timeout(20000);

    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-mocha',
      });

    shell.exec('npm install', {
      silent: true,
    });

    const results = shell.exec('npm test', {
      silent: true,
    });

    // failing initial test should return non-zero status
    assert.notEqual(results.code, 0, '`npm test` failed to return a non-zero status');
    // Just check that the test output indicates a failure
    assert(results.toString().match(/failing|expected.*to not equal/), '`npm test` output should indicate test failure');
  });
});
