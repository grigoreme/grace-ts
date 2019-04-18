import { Test } from '../helpers/test';

/**
 * Unit testing target function taking inline configuration.
 */
// tslint:disable-next-line: function-name
export function UnitTestWith(userInput: any, userOutput: any, keyName: string, context: any = {}) {
  return function (target?: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    const testName = keyName || 'no name';
    Test(descriptor.value, target.constructor.name, userInput, userOutput, context, propertyKey, testName);
    return descriptor;
  };
}
