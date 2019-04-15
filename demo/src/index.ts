import { UnitTest } from '../../dist';

export class ObjectKeys {
  constructor() { }

  @UnitTest({ key1: true }, ['key1', 'key2'])
  objectKeys(obj) {
    return Object.keys(obj);
  }
}
