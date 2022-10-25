let d = document.createElement('div');
d.id = 'output';
document.body.appendChild(d);
let oh = 0;
function innerHTMLb() {
  var content = '';
  for (var count = 0; count < 100; count++) {
    content += Math.random();
    // oh = document.getElementById('output').offsetHeight;
  }
  document.getElementById('output').innerHTML += content;
}
