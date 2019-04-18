import { easyColorful } from './helpers/textDecorate';

declare var unitResponse: { [key: string]: { [key: string]: { container: string, output: string[], succeed: boolean, name: string }[] } };
// Hacky but i need it this way to work.
if (typeof unitResponse === 'undefined') {
  // tslint:disable-next-line: prefer-const, no-var-keyword
  global['unitResponse'] = {};
}

process.on('beforeExit', () => {
  if (!unitResponse || !Object.keys(unitResponse).length) {
    return;
  }
  const red = easyColorful('red');
  const green = easyColorful('green');
  console.log('\n');

  Object.keys(unitResponse).map((className) => {
    const methods = unitResponse[className];
    const classSucceed = Object.keys(methods).every((method) => {
      return methods[method].every((test) => {
        return test.succeed;
      });
    });
    const emoji = (status: boolean) => status ? green('✅') : red('❌');
    const pads = (count: number) => {
      let paddings = '';
      for (let i = 0; i <= count; i += 1) {
        paddings += '  ';
      }
      return paddings;
    };

    console.log(`${emoji(classSucceed)} ${className}`);
    Object.keys(methods).forEach((methodName) => {
      const method = methods[methodName];
      const methodSucceed = method.every((test) => {
        return test.succeed;
      });

      console.log(`${pads(1)} ${emoji(methodSucceed)} ${methodName}`);

      method.forEach((test) => {
        console.log(`${pads(2)} ${emoji(test.succeed)} ${test.name}`);
        if (!test.succeed) {
          const output = test.output.map((str: string) => `${pads(3)} ${str}`);
          console.log(output.join('\n'));
        }
      });
    });
  });
});

export * from './decorators/index';
