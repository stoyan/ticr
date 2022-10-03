const fs = require('fs');


async function echoSupport() {
  const {browser, page} = await setup();
  await page.goto(sandboxURL);
  await done(browser, page);
  let traceData = fs.readFileSync(program.opts().trace).toString();
  if (traceData.includes('"ticount":')) {
    green('`ticount` is supported');
  } else {
    red('`ticount` is NOT supported, see https://github.com/stoyan/ticr for ideas');
  }
}

module.exports = echoSupport;