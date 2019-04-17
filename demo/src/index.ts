import { UnitConfig, UnitTest } from '../../dist/index.js';
import { config } from './config';

@UnitConfig(config)
export class ObjectKeys {
  private loading: boolean;

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

  @UnitTest()
  toBoolean(someVal) {
    return !someVal;
  }

  @UnitTest()
  setLoading() {
    this.loading = true;
  }

  @UnitTest()
  setUnloading() {
    this.loading = false;
  }
}
