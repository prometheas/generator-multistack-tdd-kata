const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const os = require('os');

describe('php-unit kata stack', function () {
  it('installs the correct files', async function () {
    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'fizz-buzz',
        stack: 'php-phpunit',
      });

    assert.file([
      'README.md',
      'gulpfile.js',
      'src/FizzBuzz.php',
      'tests/FizzBuzzTest.php',
      'package.json',
      'composer.json',
      'phpunit.xml',
      '.gitignore',
    ]);
  });
});
