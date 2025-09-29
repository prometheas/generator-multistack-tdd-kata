import { describe, it } from 'vitest';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import path from 'path';
import os from 'os';

describe('php-phpspec kata stack', () => {
  it('installs the correct files', async () => {
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
