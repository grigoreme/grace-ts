import { UnitConfig, RunTest } from '../../dist';
import { config } from './config';

@UnitConfig(config)
export class ObjectKeys {
  constructor() { }

  @RunTest()
  objectKeys(obj) {
    return Object.keys(obj);
  }

  @RunTest()
  charOnlyKeys(obj) {
    return Object.keys(obj).map((key) => {
      return key.replace(/0-9/, '');
    });
  }

  @RunTest()
  isUndefined(someVal) {
    return !someVal;
  }
}
