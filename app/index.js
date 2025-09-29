const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const caser = require('stringcase');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

// katas and stacks
const availableKatas = fs
  .readdirSync(path.join(__dirname, 'templates', 'katas'))
  .map(function stripFileExtension(filename) {
    return filename.replace(/\.md$/, '');
  });

const availableStacks = fs.readdirSync(
  path.join(__dirname, 'templates', 'stacks'),
);

function determineOutputFileName(context, fileName) {
  return fileName
    // double lodash prefix indicates a dotfile
    .replace(/^__/, '.')
    // otherwise, simply remove the lodash
    .replace(/^_/, '')
    // interpolate kata name into output filenames
    .replace(/\{kata_name\}/, context.kata.pascalized);
}

module.exports = class extends Generator {
  initializing() {
    this.pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'package.json')),
    );
  }

  async prompting() {
    const prompts = [
      {
        name: 'name',
        message: 'What is your name',
        default: process.env.USER,
      },
      {
        name: 'kata',
        type: 'list',
        message: 'What type of kata?',
        choices: availableKatas,
        default: 'string-calculator',
      },
      {
        name: 'stack',
        type: 'list',
        message: 'What testing stack?',
        choices: availableStacks,
        default: 'js-mocha',
      },
    ];

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the fabulous ${chalk.red('tdd-kata')} generator!`,
    ));

    const props = await this.prompt(prompts);
    this.version = '1.0.0';
    this.name = props.name;
    this.kata = props.kata;
    this.stack = props.stack;
  }

  writing() {
    this.writeReadme();
    this.writeProjectFiles();
  }

  writeReadme() {
    this.fs.copy(
      this.templatePath(path.join('katas', `${this.kata}.md`)),
      this.destinationPath('README.md'),
    );
  }

  writeProjectFiles() {
    const context = {
      version: this.version,
      name: this.name,
      kata: {
        slug: this.kata,
        pascalized: caser.pascalcase(this.kata),
      },
    };

    // list all file paths recursively, excluding directories
    const contents = glob.sync('**', {
      cwd: path.join(__dirname, 'templates', 'stacks', this.stack),
      nodir: true,
    });

    contents.forEach((current) => {
      this.fs.copyTpl(
        this.templatePath(path.join('stacks', this.stack, current)),
        this.destinationPath(determineOutputFileName(context, current)),
        context,
      );
    });
  }

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
};
