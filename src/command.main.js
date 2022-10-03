const {getResults} = require('./tracer.js');

function echoResults() {
  console.log(
    JSON.stringify(getResults(program.opts()), null, 2)
  );
}

module.exports = echoResults;