let i = 0;
addElements(1000);

function collecta() {
  let all = document.getElementsByTagName('div');
  for (let a = 0, len = all.length; a < len; a++) {
    i++;
  }
}
