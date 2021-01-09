window.onload = function addFile() {
var xhttp;
var para;
var f = (function(){
  for (var i = 1; i <= 3; i++) {
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
      xhttp.open("GET", "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt", false);
      xhttp.send();
    })(i, para);
  }
})();
}
