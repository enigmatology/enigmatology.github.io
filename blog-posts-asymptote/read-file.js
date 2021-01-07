function addFile() {
  var client = new XMLHttpRequest();
  client.open('GET', "https://wgvozdjak.github.io/blog-posts-asymptote/test-post.txt");
  client.onreadystatechange = function() {
  	document.getElementById("blog-post").textContent = client.responseText;
  }
  client.send();
}
