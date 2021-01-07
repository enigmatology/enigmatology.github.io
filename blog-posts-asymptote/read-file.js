window.onload = function addFile() {
  var client = new XMLHttpRequest();
  var text = "test-post.txt";
  client.open('GET', "https://wgvozdjak.github.io/blog-posts-asymptote/" + text);
  client.onreadystatechange = function() {
  	document.getElementById("blog-post").textContent = client.responseText;
  }
  client.send();
}
