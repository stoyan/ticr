let d = document.createElement('div');
d.id = 'output';
document.body.appendChild(d);

function layOutVisible() {
  document.getElementById('output').innerHTML = 'Well done!';
  return document.body.offsetHeight;
}
