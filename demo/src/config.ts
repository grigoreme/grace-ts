export const config = {
  isUndefined: [
    {
      inputs: [null],
      output: true,
    },
    {
      inputs: [undefined],
      output: true,
    },
    {
      inputs: [0],
      output: true,
    },
    {
      inputs: [false],
      output: true,
    },
    {
      inputs: [true],
      output: false,
    },
    {
      inputs: ['test'],
      output: false,
    },
  ],
  charOnlyKeys: [
    {
      inputs: [{
        some_key: 'some_value1',
      }],
      output: ['some_key'],
    },
  ],
  objectKeys: [
    {
      inputs: [{
        some_key: 'some_value',
      }],
      output: ['some_key'],
    },
  ],
};
