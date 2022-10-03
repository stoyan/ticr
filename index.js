#!/usr/bin/env node

const {program} = require('commander');

const {red, green, median} = require('./src/util.js');

const sandboxURL = 'file://' + process.mainModule.path + '/examples/sandbox.html';

async function run() {
  const res = [];
  const opts = program.opts();
  for (let i = 0; i < opts.runs; i++) {
    const r = await runOnce(sandboxURL);
    if (r.error) {
      red(r.error);
      process.exit(); 
    }
    res.push(r);
  }
  if (res.length === 1) {
    console.log(JSON.stringify(res[0], null, 2));
    process.exit();
  }
  
  if (opts.reportRuns === 'all') {
    console.log(JSON.stringify(res, null, 2));
    process.exit();    
  }
  
  const sorted = res.map(r => r.tic).sort();
  
  const winner = opts.reportRuns === 'lowest' ? sorted[i] : median(sorted);  
  
  console.log(res); // todo: delete

}

async function runAB() {
  
}

program
  .name('ticr')
  .description('CLI for thread instruction counting')
  .version('1.0.1')
  .option('-m, --marker <char>', 'marker to look for in the trace file', 'testmarker')
  .option('-t, --trace <char>', 'name/path to write the trace file', 'trace.json')
  .option('-u, --url <char>', 'URL of a test page', sandboxURL)
  .option('--chrome <char>', 'path to the Chrome executable', '.' + process.mainModule.path + '/chrome')
  .option('--runs <int>', 'How many times to run the test. Each run closes and opens the browser again', 3)
  .option('--report-runs <char>', 'Options: lowest, median, all.', 'lowest')
  .action(run);
  
program
  .command('ab <test.html> <a.js> <b.js>')
  .description('Run an A/B test by providing URLs to test page, an a.js and a b.js')
  .action(runAB);

program
  .command('sandbox')
  .description('Print out the contents of a sandbox.html to toy with. Example use: `ticr sandbox > sandbox.html`')  
  .action(() => {
    const echoSandbox = require('./src/command.sandbox.js');
    echoSandbox();
  });

program
  .command('support')
  .description('Tests if `ticount` is supported by the browser')  
  .action(() => {
    const echoSupport = require('./src/command.support.js');
    echoSupport();
  });
  
program
  .command('results')
  .description('Parses a trace.json to show results')  
  .action(() => {
    const echoResults = require('./src/command.results.js');
    echoResults(program.opts()); 
  });

program.parse();
