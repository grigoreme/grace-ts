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

// tslint:disable-next-line: function-name
export function UnitConfig<T extends { new(...args: any[]): {} }>(config) {
  return function (target, property) {
    Object.defineProperty(target.prototype, '__CONFIGURATION__', {
      get: () => { return config; },
      enumerable: false,
      configurable: false,
    });

    return target;
  };
}

// tslint:disable-next-line: function-name
export function RunTest() {
  return function (target?: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    const instance = new target.constructor();
    setTimeout(() => {
      const config = instance.constructor.prototype['__CONFIGURATION__'];
      if (!config[propertyKey]) {
        return;
      }
      config[propertyKey].forEach(({inputs, output}) => {
        Test(instance[propertyKey], inputs, output, instance, propertyKey);
      });
    });
    return descriptor.value;
  };
}
