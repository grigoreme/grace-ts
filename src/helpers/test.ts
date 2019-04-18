import { easyColorful } from './textDecorate';
import { toArray } from './toArray';
import { deepEqual } from './differ';

declare var unitResponse;

const fail = easyColorful('red');
const success = easyColorful('green');
const cyan = easyColorful('cyan');
const yellow = easyColorful('yellow');

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
  className: string,
  input: any,
  output: any,
  context: any,
  propertyKey: string | symbol,
  testKey: string,
) {
  let reasons: string[] = [];
  let failed = false;

  const result = func.call(context, ...toArray(input));
  // Final value mismatch error.
  if (!deepEqual(output.value, result)) {
    failed = true;
    reasons = [
      ...reasons,
      fail(' Result mismatch.'),
      `  ${fail('Expected:')} ${cyan(JSON.stringify(output.value))}`,
      `  ${fail('Returned:')} ${yellow(JSON.stringify(result))}`,
    ];
  }
  // Context mismatch error.
  if (output.hasOwnProperty('context') && !deepEqual(context, output.context)) {
    failed = true;
    // Search for which keys got broken.
    Object.keys(output.context).forEach((key) => {
      if (!deepEqual(output.context[key], context[key])) {
        reasons = [
          ...reasons,
          ` ${fail('Context mismatch for \'')}${cyan(key)}${fail('\'.')}`,
          `  ${fail('Expected:')} ${cyan(JSON.stringify(output.context[key]))}`,
          `  ${fail('Returned:')} ${yellow(JSON.stringify(context[key]))}`,
        ];
      }
    });
  }

  const color = failed ? fail : success;
  const status = `Unit ${String(testKey)} ${failed ? 'failed' : 'succeed'}`;
  const pattern = [
    // tslint:disable-next-line: max-line-length
    `${color(`${status} from method '`)}${cyan(String(propertyKey))}${color(`' inside ${className}.`)}`,
    ...reasons,
  ].join('\n');

  if (failed) {
    unitResponse.error.push(pattern);
    return false;
  }

  unitResponse.success.push(pattern);
  return true;
}
