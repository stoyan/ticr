function median(a) {
  if (a % 2 === 0) {
    a.pop(); // ignore the last one
  }
  return a[(a.length - 1) / 2];
}

function red(msg) {
  console.log('\x1B[31m' + msg + '\x1B[39m');
}

function green(msg) {
  console.log('\x1B[32m' + msg + '\x1B[39m');
}

module.exports = {
  median, 
  red, 
  green,
  sandboxURL: 'file://' + process.mainModule.path + '/examples/sandbox.html',
};