import { describe, it } from 'vitest';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import path from 'path';
import os from 'os';

describe('php-unit kata stack', () => {
  it('installs the correct files', async () => {
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
