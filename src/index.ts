declare var unitResponse: { success: [], error: [] };
// Hacky but i need it this way to work.
if (typeof unitResponse === 'undefined') {
  // tslint:disable-next-line: prefer-const, no-var-keyword
  global['unitResponse'] = { success: [], error: [] };
}

process.on('beforeExit', () => {
  const isRollup = process.env.npm_lifecycle_event === 'build';
  if (isRollup) {
    return;
  }
  unitResponse.success.forEach((log: string) => console.log(log));
  unitResponse.error.forEach((log: string) => console.error(log));
});

export * from './decorators/index';
