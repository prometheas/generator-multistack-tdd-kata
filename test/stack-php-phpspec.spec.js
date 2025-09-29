const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const os = require('os');

describe('php-phpspec kata stack', function () {
  it('installs the correct files', async function () {
    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'bowling-game',
        stack: 'php-phpspec',
      });

    assert.file([
      'README.md',
      'gulpfile.js',
      'src/BowlingGame.php',
      'spec/BowlingGameSpec.php',
      'package.json',
      'composer.json',
      'phpspec.yml',
      '.gitignore',
    ]);
  });
});
