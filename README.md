# @FusionWorks/inline-test

[![GitHub package.json version](https://img.shields.io/github/package-json/v/FusionWorks/inline-test.svg?label=Version)](https://github.com/FusionWorks/inline-test) 
[![npm downloads](https://img.shields.io/npm/dm/@fusionworks/inline-test.svg)](https://npmjs.org/@fusionworks/inline-test)
[![Coverage Status](https://coveralls.io/repos/github/grigoreme/inline-test/badge.svg?branch=master)](https://coveralls.io/github/FusionWorks/inline-test?branch=master) 

Decorator based unit testing.

`inline-test` is an javascript solution for testing large amount of functions without wasting any extra time on that. The logger was designed to be extremely flexible and light; it doesn't require you to deep learn any framework, just give some dummy inputs and outputs which will be compared on build.

It was built for modern browsers using _TypeScript_.

## Features

- Handle multiple tests in a row for same functions.
- Allow to declare global configuration file for all tests. ( better space management )

## Features todo

- Test all functions of a class.

## Installation

To use inline-test in your project install it via [npm](https://www.npmjs.com/package/@fusionworks/inline-test):

```
npm i @fusionworks/inline-test --save-dev
```

## Testing

You can test it out by running

- `cd demo`
- `npm run test`
