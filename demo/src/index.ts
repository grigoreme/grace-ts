import { UnitConfig, UnitTest } from '../../dist/index.js';
import { config } from './config';

@UnitConfig(config)
export class ObjectKeys {
  // tslint:disable-next-line: variable-name
  private _loading: boolean;

  constructor(public defaultLoadingState: boolean) {
    this._loading = defaultLoadingState;
  }

  @UnitTest()
  get loading() {
    return this._loading;
  }

  // @UnitTest()
  objectKeys(obj) {
    return Object.keys(obj);
  }

  // @UnitTest()
  charOnlyKeys(obj) {
    return Object.keys(obj).map((key) => {
      return key.replace(/0-9/, '');
    });
  }

  // @UnitTest()
  toBoolean(someVal) {
    return !someVal;
  }

  @UnitTest()
  setLoading() {
    this._loading = true;
  }

  @UnitTest()
  setUnloading() {
    this._loading = false;
  }

  @UnitTest()
  lazyReset() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.defaultLoadingState === undefined) {
          return reject('No default state defined.');
        }
        this._loading = this.defaultLoadingState;

        return resolve(this._loading);
      }, 500);
    });
  }
}
