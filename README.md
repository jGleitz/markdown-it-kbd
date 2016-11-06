# markdown-it-kbd [![Build Status](https://travis-ci.org/jGleitz/markdown-it-prism.svg?branch=master)](https://travis-ci.org/jGleitz/markdown-it-kbd) [![dependencies Status](https://david-dm.org/jGleitz/markdown-it-prism/status.svg)](https://david-dm.org/jGleitz/markdown-it-kbd)
> [markdown-it](https://github.com/markdown-it/markdown-it) plugin to highlight code blocks using

Renders `[[x]]` as `<kbd>x</kbd>`. ([`<kbd>`](http://www.w3schools.com/tags/tag_kbd.asp) is the tag for keystrokes).

## Usage
```js
const md = require('markdown-it')();
const kbd = require('markdown-it-kbd');

md.use(kbd);
```

## Parsing note

The end tag `]]` must be on the same line as the start tag `[[`.

At the moment, “`[[`” and “`]]`” are not allowed within keystroke tags, because I can't think of a way to handle this that would make sense in all scenarios. If you think you know how it should be handled, please file an issue!
