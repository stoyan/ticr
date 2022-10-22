const fs = require('fs');

async function echoSandbox() {
  console.log(
    fs
      .readFileSync(process.mainModule.path + '/examples/sandbox.html')
      .toString(),
  );
}

module.exports = echoSandbox;
