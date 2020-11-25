#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const keyFile = path.join(process.env.HOME, '.ssh/id_ed25519.pub');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!shell.which('git'))
            throw new Error(`Can't find git!`);
        const answers = yield inquirer.prompt([
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
            shell.exec(`ssh-keygen -t ed25519 -C ${answers.email} -f ~/.ssh/id_ed25519 -N ""`, { silent: true });
        }
        else {
            console.log(chalk.green('Found an existing SSH key.'));
        }
        console.log(chalk.bold.yellow('Please create a new key at https://github.com/settings/keys'));
        const key = fs.readFileSync(keyFile).toString();
        clipboardy.writeSync(key);
        console.log(chalk.green('SSH key copied to clipboard, just paste it into GitHub.'));
        console.log(chalk.gray('Here it is if you lose it:'));
        console.log(chalk.gray(key));
    });
}
function setGitConfig(key, value) {
    shell.exec(`git config --global ${key} "${value}"`, { silent: true });
}
function getGitConfig(key) {
    const result = shell.exec(`git config --global --get ${key}`, { silent: true }).stdout;
    return result.trim();
}
run()
    .then(() => console.log(chalk.green('Done!')))
    .catch((err) => {
    console.error(chalk.red(err.message));
    shell.exit(1);
});
//# sourceMappingURL=index.js.map