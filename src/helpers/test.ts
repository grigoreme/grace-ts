import { SafePath } from './path';
import { textDecorate } from './textDecorate';
import { toArray } from './toArray';
import { deepEqual } from './differ';
declare var unitResponse;
const failColor = 'red';
const successColor = 'green';

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
  input: any,
  output: any,
  context: any,
  propertyKey: string | symbol,
  testKey: string,
) {
  let reasons = [];
  let failed = false;

  const result = func.call(context, ...toArray(input));
  // Final value mismatch error.
  if (!deepEqual(output.value, result)) {
    failed = true;
    reasons = [
      ...reasons,
      textDecorate(failColor, ' Result mismatch.'),
      `  ${textDecorate(failColor, 'Expected:')} ${textDecorate('cyan', JSON.stringify(output.value))}`,
      `  ${textDecorate(failColor, 'Returned:')} ${textDecorate('yellow', JSON.stringify(result))}`,
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
          ` ${textDecorate(failColor, 'Context mismatch for')} '${textDecorate('cyan', key)}'${textDecorate(failColor, '.')}`,
          `  ${textDecorate(failColor, 'Expected:')} ${textDecorate('cyan', JSON.stringify(output.context[key]))}`,
          `  ${textDecorate(failColor, 'Returned:')} ${textDecorate('yellow', JSON.stringify(context[key]))}`,
        ];
      }
    });
  }

  const color = failed ? failColor : successColor;
  const pattern = [
    // tslint:disable-next-line: max-line-length
    textDecorate(color, `Unit ${String(testKey)} ${failed ? 'failed' : 'succeed'} for method '${String(propertyKey)}' inside ${SafePath(__filename)}.`),
    ...reasons,
  ].join('\n');

  if (failed) {
    unitResponse.error.push(pattern);
    return false;
  }

  unitResponse.success.push(pattern);
  return true;
}
