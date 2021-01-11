window.onload = function addFile() {
var xhttp;
var para, header, content;
var text, splitText, remainingText;

var post;
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
          
          post = document.getElementById(i+"");
          post.appendChild(header);
          post.appendChild(content);
          
          text = this.responseText;
          splitText = text.split("\n");
          header.innerHTML = splitText[0];
          
          remainingText = text.slice(splitText[0].length+2, text.length);
          
          while (remainingText.includes("\n"))  {
            remainingText = remainingText.replace("\n", "<br>");
          }
          
          content.innerHTML = remainingText;
          post.style.backgroundColor = "rgb(214, 214, 214)";
          post.style.margin = "20px";
          post.style.borderRadius = "15px";
		  
        }
      };
      xhttp.open("GET", "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt", true);
      xhttp.send();
    })(i, para);
  }
})();
}
