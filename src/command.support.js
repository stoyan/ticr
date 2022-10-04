const fs = require('fs');
const {setup, done} = require('./runner.js');
const {red, green, sandboxURL} = require('./util.js');

async function echoSupport(opts) {
  const {browser, page} = await setup(opts);
  await page.goto(sandboxURL);
  await done({browser, page});
  let traceData = fs.readFileSync(opts.trace).toString();
  if (traceData.includes('"ticount":')) {
    green('`ticount` is supported');
  } else {
    red('`ticount` is NOT supported, see https://github.com/stoyan/ticr for ideas');
  }
}

module.exports = echoSupport;