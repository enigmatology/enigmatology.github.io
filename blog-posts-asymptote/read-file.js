window.onload = function addFile() {
  var para, client, node, element;
  for (var i = 1; i <= 1; i++) {
    client = new XMLHttpRequest();
    client.open('GET', "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt");
    client.onreadystatechange = function() {
      para = document.createElement("p");
      p.id = i + "";
      node = document.createTextNode(client.responseText);
      para.appendChild(node);
      element = document.getElementById(i-1 + "");
      element.appendChild(para);
    }
    client.send();
  }
}
