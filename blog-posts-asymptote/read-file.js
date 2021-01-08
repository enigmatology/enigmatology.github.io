window.onload = function addFile() {

// ADD ONE TO THIS NUMBER EVERY TIME A NEW BLOG POST IS ADDED
var NUMBER_OF_BLOG_POSTS = 3;	
	

var xhttp;
var para;
var f = (function(NUMBER_OF_BLOG_POSTS){
  for (var i = NUMBER_OF_BLOG_POSTS; i <= 3; i++) {
    (function(i, para){
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          para = document.createElement("div");
          para.setAttribute("id", i+"");
          para.innerHTML = this.responseText;
	  document.body.appendChild(para);
        }
      };
      xhttp.open("GET", "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt", true);
      xhttp.send();
    })(i, para);
  }
})(NUMBER_OF_BLOG_POSTS);
}
