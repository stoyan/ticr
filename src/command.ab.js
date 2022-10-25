const {getResults, report} = require('./results.js');
const {red, green, sandboxURL} = require('./util.js');
const {runOnce} = require('./runner.js');

async function ab(ajs, bjs, opts) {
  if (opts.url === sandboxURL) {
    red('The default URL ' + sandboxURL + ' is not a valid test URL.');
    red('Please use the --url option to point to a test page.');
    process.exit();
  }

  const resA = [];
  const resB = [];
  for (let i = 0; i < opts.runs; i++) {
    // A
    let r = await runOnce(opts.url + '#' + ajs, opts);
    if (r.error) {
      red(r.error);
      process.exit();
    }
    resA.push(r);
    // B
    r = await runOnce(opts.url + '#' + bjs, opts);
    if (r.error) {
      red(r.error);
      process.exit();
    }
    resB.push(r);
  }
  const reportA = report(resA, opts);
  const reportB = report(resB, opts);

  green(`Results from script A (${ajs})`);
  console.log(JSON.stringify(reportA, null, 2));
  green(`Results from script B (${bjs})`);
  console.log(JSON.stringify(reportB, null, 2));

  if (opts.reportRuns === 'all') {
    process.exit();
  }

  if (reportA.tic === reportB.tic) {
    green('A takes exactly the same number of instructions as B');
  }
  const diff = reportA.tic - reportB.tic;
  if (Math.abs(diff) < reportA.tic && Math.abs(diff) < reportB.tic) {
    // report %
    if (diff > 0) {
      // A is greater
      const percent = Math.abs(((100 * diff) / reportB.tic).toFixed(2));
      green(`A uses ${percent}% more CPU instructions than B`);
    } else {
      const percent = Math.abs(((100 * diff) / reportA.tic).toFixed(2));
      red(`B uses ${percent}% more CPU instructions than A`);
    }
  } else {
    // report x
    if (diff > 0) {
      green(
        'A uses ' +
          (reportA.tic / reportB.tic).toFixed(2) +
          ' times more CPU instructions than B',
      );
    } else {
      red(
        'B uses ' +
          (reportB.tic / reportA.tic).toFixed(2) +
          ' times more CPU instructions than A',
      );
    }
  }
}

module.exports = ab;
