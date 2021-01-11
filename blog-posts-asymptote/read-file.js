/*window.onload = function addFile() {
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
*/

window.onload = function addFile() {
var xhttp;
var para, header, content;
var text, splitText, remainingText;
var f = (function(){
  for (var i = 1; i <= 3; i++) {
    (function(i, para){
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          para = document.createElement("div");
          para.setAttribute("id", i+"");
          header = document.createElement("div");
          header.setAttribute("class", "post-header");
          content = document.createElement("div");
          content.setAttribute("class", "post-content");
          document.body.appendChild(para);
          document.getElementById(i+"").appendChild(header);
          document.getElementById(i+"").appendChild(content);
          
          text = this.responseText;
          splitText = text.split("\n");
          header.innerHTML = splitText[0];
          
          remainingText = text.slice(splitText[0].length+2, text.length);
          
          content.innerHTML = remainingText;
		  
        }
      };
      xhttp.open("GET", "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt", true);
      xhttp.send();
    })(i, para);
  }
})();
}
