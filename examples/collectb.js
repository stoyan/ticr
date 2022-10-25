let i = 0;
addElements(1000);

function collectb() {
  let all = Array.from(document.getElementsByTagName('div'));
  for (let a = 0, len = all.length; a < len; a++) {
    i++;
  }
}
