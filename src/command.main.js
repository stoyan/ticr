const {getResults, report} = require('./tracer.js');
const {red} = require('./util.js');
const {runOnce} = require('./runner.js');

async function run(opts) {
  const res = [];
  for (let i = 0; i < opts.runs; i++) {
    const r = await runOnce(opts.url, opts);
    if (r.error) {
      red(r.error);
      process.exit(); 
    }
    res.push(r);
  }  
  console.log(JSON.stringify(report(res, opts), null, 2));
}

module.exports = run;