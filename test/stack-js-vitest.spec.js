import { describe, it } from 'vitest';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import path from 'path';
import os from 'os';
import shell from 'shelljs';

describe('js-vitest kata stack', () => {
  const tempTestingDir = path.join(os.tmpdir(), './temp-test');

  it('installs the correct files', async () => {
    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-vitest',
      });

    assert.file([
      'README.md',
      'src/StringCalculator.js',
      'test/StringCalculator.spec.js',
      'package.json',
      'vitest.config.js',
      '.gitignore',
      '.jshintrc',
    ]);
  });

  it('can properly run a failing test after installation', async () => {

    await helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true,
      })
      .withPrompts({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-vitest',
      });

    shell.exec('npm install', {
      silent: true,
    });

    const results = shell.exec('npm test', {
      silent: true,
    });

    // failing initial test should return non-zero status
    assert.notEqual(results.code, 0, '`npm test` failed to return a non-zero status');
    // Just check that the test output indicates a failure (Vitest-compatible)
    const out = results.toString();
    assert(/fail|✖|AssertionError|expected/i.test(out), '`npm test` output should indicate test failure');
  });
});
