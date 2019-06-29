'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');
var os = require('os');
var shell = require('shelljs');

describe('js-jest kata stack', function () {

  it('installs the correct files', function (done) {
    var tempTestingDir = path.join(os.tmpdir(), './temp-test-js-jest-1');

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-jest'
      })
      .on('end', function () {
        assert.file([
          tempTestingDir + '/README.md',
          tempTestingDir + '/src/StringCalculator.js',
          tempTestingDir + '/src/StringCalculator.test.js',
          tempTestingDir + '/package.json',
          tempTestingDir + '/.gitignore'
        ]);

        done();
      });
  });

  it('can properly run a failing test after installation', function (done) {
    var tempTestingDir = path.join(os.tmpdir(), './temp-test-js-jest-2');
    this.timeout(40000);

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(tempTestingDir)
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        name: 'some_name',
        kata: 'string-calculator',
        stack: 'js-jest'
      })
      .on('end', function () {
        // shell.cd(tempTestingDir);
        shell.exec('npm install', {
          silent: true
        });

        var results = shell.exec('npm test', {
          silent: false
        });

        // console.log('results', results);

        // failing initial test should return non-zero status
        assert.notEqual(results.code, 0, '`npm test` failed to return a non-zero status');
        assert(results.stderr.match(/✕ it should not be null \(/g), '`npm test` output should complain that StringCalculator should not be null');

        done();
      });
  });
});
