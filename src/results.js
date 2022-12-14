const fs = require('fs');

function getResults(opts) {
  let traceData = fs.readFileSync(opts.trace).toString();
  if (!traceData.includes('ticount')) {
    return {error: 'No `ticount` instances in this trace'};
  }

  const data = JSON.parse(traceData);
  const startMarker = opts.marker + ' start';
  const endMarker = opts.marker + ' end';
  const metaMarker = opts.marker + ' meta';

  let tic = 0;
  let lookForLayouts = false;
  let layouts = 0;
  let lookForMeta = false;
  let meta = null;
  data.traceEvents.forEach((l) => {
    if (l.name === startMarker) {
      tic = l.ticount;
      lookForLayouts = true;
    }
    if (l.name === endMarker) {
      tic = l.ticount - tic;
      lookForLayouts = false;
      lookForMeta = true;
    }
    if (lookForLayouts && l.name === 'Layout') {
      layouts++;
    }
    if (lookForMeta && l.name.startsWith(metaMarker)) {
      meta = JSON.parse(l.name.replace(metaMarker, ''));
      lookForMeta = false;
    }
  });
  ////// todo
  // tic = Math.floor(Math.random()*1000000);
  const res = {tic};
  if (layouts) {
    res.layouts = layouts;
  }
  if (meta) {
    res.meta = meta;
  }
  return res;
}

function median(a) {
  if (a.length % 2 === 0) {
    a.pop(); // ignore the last one, if even elements
  }
  return a[(a.length - 1) / 2];
}

function report(results, opts) {
  //console.log(results.map((r) => r.tic));
  if (results.length === 1) {
    return results[0];
  }

  if (opts.reportRuns === 'all') {
    return results;
  }

  const sorted = results.map((r) => r.tic).sort();
  const winner = opts.reportRuns === 'lowest' ? sorted[0] : median(sorted);
  return results.find((r) => r.tic === winner);
}

module.exports = {
  getResults,
  report,
};
