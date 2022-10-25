let d = document.createElement('div');
d.id = 'output';
document.body.appendChild(d);
let oh = 0;
function innerHTMLa() {
  for (var count = 0; count < 100; count++) {
    document.getElementById('output').innerHTML += Math.random();
    // oh = document.getElementById('output').offsetHeight;
  }
}
