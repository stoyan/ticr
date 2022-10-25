#!/usr/bin/env node

const {program} = require('commander');

const {sandboxURL} = require('./src/util.js');

program
  .name('ticr')
  .description('CLI for thread instruction counting')
  .version('1.0.8')
  .option('-m, --marker <char>', 'marker to look for in the trace file', 'testmarker')
  .option('-t, --trace <char>', 'name/path to write the trace file', 'trace.json')
  .option('-u, --url <char>', 'URL of a test page', sandboxURL)
  .option('--chrome <char>', 'path to the Chrome executable')
  .option('--runs <int>', 'How many times to run the test. Each run closes and opens the browser again', 3)
  .option('--report-runs <char>', 'Options: lowest, median, all.', 'lowest')
  .option('-o, --options', 'Dump the program options', false)
  .action(() => {
    const run = require('./src/command.main.js');
    run(program.opts());
  });

program
  .command('ab <a.js> <b.js>')
  .description('Run an A/B test by providing URLs to test page (--url option), an a.js and a b.js JavaScript files')
  .action((a, b) => {
    const ab = require('./src/command.ab.js');
    ab(a, b, program.opts());
  });

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
    echoSupport(program.opts());
  });

program
  .command('results')
  .description('Parses a trace.json to show results')  
  .action(() => {
    const echoResults = require('./src/command.results.js');
    echoResults(program.opts()); 
  });

program.parse();

if (program.opts().options) {
  console.log("Running with these options:");
  console.log(program.opts());
}

