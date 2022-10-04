const puppeteer = require('puppeteer');
const {getResults} = require('./tracer.js');

async function setup(opts) {
  const browser = await puppeteer.launch({
    //executablePath: opts.chrome,
    args: [
    	'--no-sandbox', 
    	'--enable-thread-instruction-count',
    ],
  });
  const page = await browser.newPage();
  await page.tracing.start({
    path: opts.trace,
  });
  return {browser, page};
}

async function done({browser, page}) {
  await page.tracing.stop();
  await browser.close();
}

async function runOnce(url, opts) {
  const init = await setup(opts);
  await init.page.goto(url);
  await init.page.waitForSelector('#done', {visible: true});
  await done(init);
  return getResults(opts);
}

module.exports = {
  setup,
  done,
  runOnce,
};
