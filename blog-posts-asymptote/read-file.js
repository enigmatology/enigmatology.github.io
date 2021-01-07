function addFile() {
  var client = new XMLHttpRequest();
  client.open('GET', "test-post.txt");
  client.onreadystatechange = function() {
  	document.getElementById("blog-post").textContent = client.responseText;
  }
  client.send();
}
