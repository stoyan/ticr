const {getResults} = require('./results.js');

function echoResults(opts) {
  const res = getResults(opts);
  if (res.error) {
    const {red} = require('./util.js');
    red(res.error);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
}

module.exports = echoResults;
