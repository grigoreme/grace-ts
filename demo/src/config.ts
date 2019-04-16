export const config = {
  isUndefined: [
    {
      inputs: [null],
      output: true,
      name: 'The null',
    },
    {
      inputs: [undefined],
      output: true,
      name: 'The undefined',
    },
    {
      inputs: [0],
      output: true,
      name: 'The zero',
    },
    {
      inputs: [false],
      output: true,
      name: 'The false',
    },
    {
      inputs: [true],
      output: false,
      name: 'The true',
    },
    {
      inputs: ['test'],
      output: false,
      name: 'The string',
    },
  ],
  charOnlyKeys: [
    {
      inputs: [{
        some_key: 'some_value1',
      }],
      output: ['some_key'],
      name: 'Simple test',
    },
  ],
  objectKeys: [
    {
      inputs: [{
        some_key: 'some_value',
      }],
      output: ['some_key'],
      name: 'Simple test',
    },
  ],
};
