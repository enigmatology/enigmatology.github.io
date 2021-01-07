function addFile(fileName) {
  var client = new XMLHttpRequest();
  client.open('GET', "https://wgvozdjak.github.io/blog-posts-asymptote/" + fileName);
  client.onreadystatechange = function() {
  	document.getElementById("blog-post").textContent = client.responseText;
  }
  client.send();
}
