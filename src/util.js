function red(msg) {
  console.log('\x1B[31m' + msg + '\x1B[39m');
}

function green(msg) {
  console.log('\x1B[32m' + msg + '\x1B[39m');
}

module.exports = {
  red,
  green,
  sandboxURL: 'file://' + process.mainModule.path + '/examples/sandbox.html',
};
