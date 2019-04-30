export const config = {
  constructorArgs: [true],
  loading: [
    {
      name: 'Loading Getter init',
      inputs: [],
      output: {
        context: { loading: true },
        errorMsg: 'No default loading state defined.',
        severity: 'log',
      },
    },
  ],
  lazyReset: [
    {
      name: 'Reseting loading status',
      inputs: [],
      output: {
        context: { loading: true },
        errorMsg: 'No default loading state defined.',
        // showThrown: false,
        severity: 'log',
      },
    },
  ],
  toBoolean: [
    {
      inputs: [null],
      output: {
        value: true,
      },
      name: 'The null',
    },
    {
      inputs: [undefined],
      output: {
        value: true,
      },
      name: 'The undefined',
    },
    {
      inputs: [0],
      output: {
        value: true,
      },
      name: 'The zero',
    },
    {
      inputs: [false],
      output: {
        value: true,
      },
      name: 'The false',
    },
    {
      inputs: [true],
      output: {
        value: false,
      },
      name: 'The true',
    },
    {
      inputs: ['test'],
      output: {
        value: false,
      },
      name: 'The string',
    },
  ],
  charOnlyKeys: [
    {
      inputs: [{
        some_key: 'some_value1',
      }],
      output: {
        value: ['some_key']
      },
      name: 'Simple test',
    },
  ],
  objectKeys: [
    {
      inputs: [{
        some_key: 'some_value',
      }],
      output: {
        value: ['some_key'],
      },
      name: 'Simple test',
    },
  ],
  setLoading: [
    {
      name: 'Set loading.',
      inputs: [],
      output: {
        value: undefined,
      },
    },
  ],
  setUnloading: [
    {
      name: 'Unset loading.',
      inputs: [],
      output: {
        value: undefined,
      },
    },
  ],
};
