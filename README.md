# @FusionWorks/grace-ts

[![GitHub package.json version](https://img.shields.io/github/package-json/v/FusionWorks/grace-ts.svg?label=Version)](https://github.com/FusionWorks/grace-ts) 
[![npm downloads](https://img.shields.io/npm/dm/@fusionworks/grace-ts.svg)](https://npmjs.org/@fusionworks/grace-ts)
[![Coverage Status](https://coveralls.io/repos/github/grigoreme/grace-ts/badge.svg?branch=master)](https://coveralls.io/github/FusionWorks/grace-ts?branch=master) 

Decorator based unit testing.

`grace-ts` is an javascript solution for testing large amount of functions without wasting any extra time on that. The logger was designed to be extremely flexible and light; it doesn't require you to deep learn any framework, just give some dummy inputs and outputs which will be compared on build.

It was built for modern browsers using _TypeScript_.

## Features

- Handle multiple tests in a row for same functions.
- Allow to declare global configuration file for all tests. ( better space management )

## Features todo

- Test all functions of a class.

## Installation

To use grace-ts in your project install it via [npm](https://www.npmjs.com/package/@fusionworks/grace-ts):

```
npm i @fusionworks/grace-ts --save-dev
```

## Testing

You can test it out by running

- `cd demo`
- `npm run test`
