/**
 * Injects into target class given config.
 * Should be used later by @runTest() decorator.
 */
// tslint:disable-next-line: function-name
export function UnitConfig(config) {
  return function (target) {
    Object.defineProperty(target.prototype, '__CONFIGURATION__', {
      get: () => config,
      enumerable: false,
      configurable: false,
    });

    return target;
  };
}
