let i = 0;
addElements(1000);

function toArray(col) {
  const a = [];
  for (let i = 0, len = col.length; i < len; i++) {
    a[i] = col[i];
  }
  return a;
}

function collectc() {
  let all = toArray(document.getElementsByTagName('div'));
  for (let a = 0, len = all.length; a < len; a++) {
    i++;
  }
}
