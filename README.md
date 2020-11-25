# codeclan-git-setup

When you get a new development machine, there are a bunch of things you need to do to set up Git properly, namely:

 * `git config --global user.name "YOUR NAME"`
 * `git config --global user.email "your@email.com"`
 * `ssh-keygen -t ed25519 -C "your@email.com"`
 * copy `~/.ssh/id_ed25519.pub` to the clipboard

This script does these things for you!

## Usage

Run:

- ```$ npx https://github.com/codeclan/codeclan-git-setup```
- Say `y` to `Ok to proceed? (y)`


Use:

```
$ node index.js
? What is your name? Fred Flintstone
? What is the email address you sign into GitHub with? fred@flintstones.com
Found an existing SSH key.
Please create a new key at https://github.com/settings/keys
SSH key copied to clipboard, just paste it into GitHub.
```

## Updating the script (Instructors):

- Clone the repo
- Make changes to `index.js`
- Commit / Push to the repo
