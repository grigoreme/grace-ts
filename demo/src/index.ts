import { UnitConfig, UnitTest } from '../../dist/index.js';
import { config } from './config';

@UnitConfig(config)
export class ObjectKeys {
  constructor() { }

  @UnitTest()
  objectKeys(obj) {
    return Object.keys(obj);
  }

  @UnitTest()
  charOnlyKeys(obj) {
    return Object.keys(obj).map((key) => {
      return key.replace(/0-9/, '');
    });
  }

  @UnitTest(true)
  isUndefined(someVal) {
    return !someVal;
  }
}
