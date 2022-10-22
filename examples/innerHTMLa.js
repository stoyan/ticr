function innerHTMLa() {
  for (var count = 0; count < 10; count++) {
    document.getElementById('done').innerHTML += 'a';
  }
}

function innerHTMLb() {
  var content = '';
  for (var count = 0; count < 10; count++) {
    content += 'a';
  }
  document.getElementById('here').innerHTML += content;
}
