declare var unitResponse: { success: [], error: [] };
// Hacky but i need it this way to work.
if (typeof unitResponse === 'undefined') {
  // tslint:disable-next-line: prefer-const, no-var-keyword
  global['unitResponse'] = { success: [], error: [] };
}

process.on('beforeExit', () => {
  // Get some free space before rendering status, for better focus.
  if (unitResponse.success.length || unitResponse.error.length) {
    console.log('\n');
  }

  console.log(unitResponse.success.join('\n\n'));
  console.log('\n');
  console.log(unitResponse.error.join('\n\n'));
});

export * from './decorators/index';
