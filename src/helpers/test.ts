import { easyColorful } from './textDecorate';
import { toArray } from './toArray';
import { deepEqual } from './differ';

declare var unitResponse;

const cyan = easyColorful('cyan');
const magenta = easyColorful('magenta');

// Severity checks here
const error = easyColorful('red');
const warn = easyColorful('yellow');
const log = easyColorful('white');
const severityTypes = { log, warn, error };

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
export async function Test(
  func: Function,
  className: string,
  input: any,
  output: any,
  context: any,
  propertyKey: string | symbol,
  testKey: string,
  targetConfig?: { [key: string]: any },
) {
  let reasons: string[] = [];
  let failed = false;
  let thrown = false;

  const severity = targetConfig.output.severity || 'error';
  const severityColor = severityTypes.hasOwnProperty(severity) ? severityTypes[severity] : error;

  const failByMessage = () => {
    reasons = [
      ...reasons,
      `${severityColor('Failed with message: ')} ${magenta(JSON.stringify(output.errorMsg))}`,
    ];
  };

  let result = func.call(context, ...toArray(input));
  if (result && typeof result.then === 'function') {
    try {
      result = await result;
    } catch (e) {
      failed = true;
      thrown = true;

      if (output.showThrown !== false) {
        reasons = [
          ...reasons,
          `${severityColor('Error thrown:')} ${magenta(JSON.stringify(e))}`,
        ];
      } else {
        failByMessage();
      }
    }
  }

  // Final value mismatch error.
  if (!thrown && output.hasOwnProperty('value') && !deepEqual(output.value, result)) {
    failed = true;
    if (!output.errorMsg) {
      reasons = [
        ...reasons,
        severityColor('Result mismatch.'),
        ` ${severityColor('Expected:')} ${cyan(JSON.stringify(output.value))}`,
        ` ${severityColor('Returned:')} ${magenta(JSON.stringify(result))}`,
      ];
    } else {
      failByMessage();
    }
  }
  // Context mismatch error.
  if (!thrown && output.hasOwnProperty('context') && !deepEqual(context, output.context)) {
    // Search for unmatched keys only.
    Object.keys(output.context).forEach((key) => {
      if (!deepEqual(output.context[key], context[key])) {
        failed = true;
        if (!output.errorMsg) {
          reasons = [
            ...reasons,
            `${severityColor('Context mismatch for \'')}${cyan(key)}${severityColor('\'.')}`,
            ` ${severityColor('Expected:')} ${cyan(JSON.stringify(output.context[key]))}`,
            ` ${severityColor('Returned:')} ${magenta(JSON.stringify(context[key]))}`,
          ];
        } else {
          failByMessage();
        }
      }
    });
  }

  const unitResult = {
    container: className,
    name: testKey,
    output: reasons,
    succeed: !failed,
    customName: !targetConfig.name,
  };

  if (!unitResponse[className]) {
    unitResponse[className] = {};
  }
  if (!unitResponse[className][propertyKey]) {
    unitResponse[className][propertyKey] = [];
  }

  unitResponse[className][propertyKey].push(unitResult);

  return !failed;
}
