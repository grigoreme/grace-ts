
import { Test } from '../helpers/test';

/**
 * Trigger unit test for target method
 * based on configuration injected in class using @UnitConfig(config).
 */
// tslint:disable-next-line: function-name
export function UnitTest() {
  if (arguments.length) {
    // tslint:disable-next-line: max-line-length
    console.warn('@UnitTest() cannot take any argument. If you want to test method with inline configurations, use @UnitTestWith().');
  }
  return function (target?: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    // Method decorators gets called first, bc of this i should wait for class decorator to be done.
    // Only after that will be able to gather injected into class metadata.
    setTimeout(() => {
      const config = target.constructor.prototype['__CONFIGURATION__'];
      if (!config[propertyKey]) {
        return;
      }
      config[propertyKey].forEach(({ inputs, output, name }, index) => {
        const testName = name ? `'${name}'` : `with index ${index}`;
        Test(target[propertyKey], inputs, output, target, propertyKey, testName);
      });
    });

    return descriptor.value;
  };
}
