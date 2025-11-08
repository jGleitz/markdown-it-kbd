# markdown-it-kbd [![CI](https://github.com/jGleitz/markdown-it-kbd/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jGleitz/markdown-it-kbd/actions/workflows/ci.yml?query=branch%3Amain) [![NPM Version](https://img.shields.io/npm/v/markdown-it-kbd?logo=npm&logoColor=%23DDD)](https://www.npmjs.com/package/markdown-it-kbd)
> [markdown-it](https://github.com/markdown-it/markdown-it) plugin for keystrokes

Renders `[[x]]` as `<kbd>x</kbd>`. ([`<kbd>`](http://www.w3schools.com/tags/tag_kbd.asp) is the tag for keystrokes).

## Usage
```js
const md = require('markdown-it')();
const kbd = require('markdown-it-kbd');

md.use(kbd);
```

This plugin can also be used together with [`markdown-it-attrs`](https://github.com/arve0/markdown-it-attrs/).

## Syntax notes

The end tag `]]` must be on the same line as the start tag `[[`.

The characters “`[`” and “`]`” are not allowed within keystroke tags.
If you need to use them, escape them with a backslash (i.e. `\[` or `\]`) or use HTML escape sequences (`&#91` for `[` or `&#93;` for `]`).
