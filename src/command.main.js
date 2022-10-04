const {getResults} = require('./tracer.js');
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

module.exports = run;