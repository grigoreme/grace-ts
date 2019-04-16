import { SafePath } from './path';
declare var unitResponse;

function textDecorate(DECORATE, text) {
  const decorate = DECORATE.toLowerCase();
  const decorators = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    cancel: '\x1b[0m',
  };
  if (!decorators[decorate]) {
    return;
  }
  return `${decorators[decorate]}${text}${decorators.cancel}`;
}

/**
 *
 * @param func Function
 * @param INPUT Inputs for testing.
 * If its array put in in another array as its allow to use single item instead.
 * @param OUTPUT Inputs for testing. Can be also only one item out of array.
 * @param context Context to be worked with.
 * @param propertyKey Method name.
 */
// tslint:disable-next-line: function-name
export function Test(
  func: Function,
  INPUT: any,
  OUTPUT: any,
  context: any,
  propertyKey: string | symbol,
  testKey: string,
) {
  const toArray = (item: any) => Array.isArray(item) ? item : [item];
  const input = toArray(INPUT);
  const output = OUTPUT;
  const result = func.call(context, ...input);
  const failed = JSON.stringify(output) !== JSON.stringify(result);
  const color = failed ? 'red' : 'green';
  const pattern = [
    // tslint:disable-next-line: max-line-length
    textDecorate(color, `Unit ${String(testKey)} ${failed ? 'failed' : 'succeed'} for method '${String(propertyKey)}' inside ${SafePath(__filename)}.`),
    `  ${textDecorate(color, 'Expected:')} ${textDecorate('cyan', JSON.stringify(output))}`,
    `  ${textDecorate(color, 'Returned:')} ${textDecorate('yellow', JSON.stringify(result))}`,
  ].join('\n');

  if (failed) {
    unitResponse.error.push(pattern);
    return false;
  }

  unitResponse.success.push(pattern);
  return true;
}
