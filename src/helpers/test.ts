import { SafePath } from './path';

// tslint:disable-next-line: function-name
export function Test(func, _input, _output, context, propertyKey) {
  const toArray = (item) => Array.isArray(item) ? item : [item];
  const input = toArray(_input);
  const output = toArray(_output);
  const result = func.call(context, ...input);
  if (JSON.stringify(output) !== JSON.stringify(result)) {
    console.error(`Unit testing failed for ${String(propertyKey)} inside ${SafePath(__filename)}.
  Expected: `, output, '\n  Returned: ', result);
  }
}
