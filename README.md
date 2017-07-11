# git-setup

When you get a new development machine, there are a bunch of things you need to do to set up Git properly, namely:

 * `git config --global user.name "YOUR NAME"`
 * `git config --global user.email "your@email.com"`
 * `ssh-keygen -t rsa -b 2048 -C "your@email.com"`
 * copy `~/.ssh/id_rsa.pub` to the clipboard

This script does these things for you!

## Usage

Install:

```
$ sudo npm install -g git-setup
```

Use:

```
$ git-setup
? What is your name? Fred Flintstone
? What is the email address you sign into GitHub with? fred@flintstones.com
Found an existing SSH key.
Please create a new key at https://github.com/settings/keys
SSH key copied to clipboard, just paste it into GitHub.
```
