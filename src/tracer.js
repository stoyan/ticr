const fs = require('fs');

function getResults(opts) {
  let traceData = fs.readFileSync(opts.trace).toString();
  if (!traceData.includes('ticount')) {
    return {error: "No `ticount` instances in this trace"};
  }
  
  const data = JSON.parse(traceData);
  const startMarker = opts.marker + ' start';
  const endMarker = opts.marker + ' end';
  const metaMarker = opts.marker + ' meta';
  
  let tic = 0;
  let lookForLayouts = false;
  let layouts = 0;
  let lookForMeta = false;
  let meta = {};
  data.traceEvents.forEach(l => {
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
  //tic = Math.floor(Math.random()*1000000);
  return {tic, layouts, meta};

}

exports.getResults = getResults;

