#!/usr/bin/env node
import * as chalk from 'chalk';
import * as clipboardy from 'clipboardy';
import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';

const keyFile = path.join(process.env.HOME, '.ssh/id_ed25519.pub');

async function run() {
  if (!shell.which('git'))
    throw new Error(`Can't find git!`);

  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'What is your name?',
      default: getGitConfig('user.name')
    },
    {
      name: 'email', 
      message: 'What is the email address you sign into GitHub with?',
      default: getGitConfig('user.email')
    },
  ]);

  setGitConfig('user.name', answers.name);
  setGitConfig('user.email', answers.email);

  if (!fs.existsSync(keyFile)) {
    console.log(chalk.yellow('Generating an SSH key for you...'));
    shell.exec(`ssh-keygen -t ed25519 -C ${answers.email} -f ~/.ssh/id_ed25519 -N ""`, {silent: true});

  } else {
    console.log(chalk.green('Found an existing SSH key.'));
  }

  console.log(chalk.bold.yellow('Please create a new key at https://github.com/settings/keys'));

  const key = fs.readFileSync(keyFile).toString();
  clipboardy.writeSync(key);

  console.log(chalk.green('SSH key copied to clipboard, just paste it into GitHub.'));
  console.log(chalk.gray('Here it is if you lose it:'));
  console.log(chalk.gray(key));
}


function setGitConfig(key: string, value: string) {
  shell.exec(`git config --global ${key} "${value}"`, {silent: true});
}


function getGitConfig(key: string) {
  const result = <string>shell.exec(`git config --global --get ${key}`, {silent: true}).stdout;
  return result.trim();
}


run()
  .then(() => console.log(chalk.green('Done!')))
  .catch((err) => {
    console.error(chalk.red(err.message));
    shell.exit(1);
  });


