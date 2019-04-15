import { SafePath } from '../helpers/path';
import { Test } from '../helpers/test';

/**
 * Unit testing target function.
 */
// tslint:disable-next-line: function-name
export function UnitTest(userInput: any, userOutput: any, context: any = {}) {
  return function (target?: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    Test(descriptor.value, userInput, userOutput, context, propertyKey);
    return descriptor;
  };
}
