
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
      const instance = target.constructor.prototype['__INSTANCE__'];
      if (!config[propertyKey]) {
        return;
      }

      // As js returns object without getters/setters i should gather them somehow. Now they are stored only inside prototype.
      // const gettersSetters = Object.getOwnPropertyNames(target.constructor.prototype).map((proto) => {
      //   return { name: proto, value: instance[proto] };
      // });

      config[propertyKey].forEach((targetConfig, index) => {
        const { inputs, output, name, context } = targetConfig;
        const testName = name || `Case ${index}`;
        let targetFunc = target[propertyKey];

        if (!targetFunc) {
          if (typeof descriptor.get === 'function') {
            targetFunc = descriptor.get;
          } else if (typeof descriptor.set === 'function') {
            targetFunc = descriptor.set;
          } else {
            throw new Error(`Missing call for ${name || target.constructor.name}`);
          }
        }

        Test(targetFunc, target.constructor.name, inputs, output, instance || context, propertyKey, testName, targetConfig);
      });
    });

    return descriptor.value;
  };
}
