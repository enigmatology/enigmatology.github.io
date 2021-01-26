var hides = [];
var posts = [];
var iterations = 0;
var NUMBEROFPOSTS = 3;

for (var i = 0; i < NUMBEROFPOSTS; i++) {
  posts.push(0);
}

window.onload = function addFile() {

var xhttp;

var f = (function(){
  for (var i = 1; i <= NUMBEROFPOSTS; i++) {
    
    (function(i){
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          posts[i-1] = this.responseText;
          
          addcontent(posts, hides);
          
        }
      };
      xhttp.open("GET", "https://wgvozdjak.github.io/blog-posts-asymptote/" + i + ".txt", true);
      xhttp.send();
    })(i);
  }
})();
}

function addcontent(posts, hides) {
  var para, header, content;
  var text, splitText, remainingText;
  var finished = true;
  for (var i = 0; i < posts.length; i++) {
    if (posts[i] === 0) {
      finished = false;
    }
  }  
  
  if (finished === true) {
    for (var i = 0; i < posts.length; i++) {
      element = document.getElementById(i+"");
      if (element == null) {

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

        text = posts[i];
        splitText = text.split("\n");

        header.innerHTML = splitText[0] + "<hr>";

        remainingText = text.slice(splitText[0].length+2, text.length);
        

        remainingText = convertbbCode(remainingText, i, []);

        content.innerHTML = remainingText;
        post.style.backgroundColor = "rgb(214, 214, 214)";
        post.style.margin = "20px";
        post.style.borderRadius = "15px";
        
      }
    }
  }
  
  
  if (finished === true) {
    for (let i = 1; i <= hides.length; i++) {
      var element = document.getElementById(i + "hide");
      
      element.addEventListener("click", function() {
                                          toggleshow(i);
                                        });
    }
  }
}
  

function convertbbCode(orig, i, currentcontents) {
  var converted = orig;
  
  var begbeg, endbeg, endend;
  var hidelabel, hidecontent, replacetext;
  var slicedhide;
  
  var begcolor, endcolor, endtag;
  var slicedcolor;
  var color, coloredtext;
  
  var begsize, endsize, endsizetag;
  var slicedsize;
  var size, sizedtext;
  
  while (converted.includes("[b]")) {
    converted = converted.replace("[b]", "<b>");
  }
  while (converted.includes("[/b]")) {
    converted = converted.replace("[/b]", "</b>");
  }
  while (converted.includes("[u]")) {
    converted = converted.replace("[u]", "<u>");
  }
  while (converted.includes("[/u]")) {
    converted = converted.replace("[/u]", "</u>");
  }
  while (converted.includes("[i]")) {
    converted = converted.replace("[i]", "<i>");
  }
  while (converted.includes("[/i]")) {
    converted = converted.replace("[/i]", "</i>");
  }
  while (converted.includes("[code]\n")) {
    converted = converted.replace("[code]\n", "<div class=\"code\">");
  }
  while (converted.includes("[code]")) {
    converted = converted.replace("[code]", "<div class=\"code\">");
  }
  while (converted.includes("[/code]")) {
    converted = converted.replace("[/code]", "</div>");
  }
  while (converted.includes("[center]")) {
    converted = converted.replace("[center]", "<div class=\"centered\">");
  }
  while (converted.includes("[/center]")) {
    converted = converted.replace("[/center]", "</div>");
  }
  while (converted.includes("[color=")) {
    slicedcolor = converted.slice(converted.indexOf("[color="), converted.indexOf("[/color]") + 8);
    begcolor = 7;
    endcolor = slicedcolor.indexOf("]");
    color = slicedcolor.slice(begcolor, endcolor);
    endcolor = slicedcolor.indexOf("]") + 1;
    endtag = slicedcolor.indexOf("[/color]");
    colortext = slicedcolor.slice(endcolor, endtag);
    converted = converted.replace(slicedcolor, "<div style=\"display:inline; color: " + color + ";\">" + colortext + "</div>");
  }
  while (converted.includes("[size=")) {
    slicedsize = converted.slice(converted.indexOf("[size="), converted.indexOf("[/size]") + 7);
    begsize = 6;
    endsize = slicedsize.indexOf("]");
    size = slicedsize.slice(begsize, endsize);
    endsize = slicedsize.indexOf("]") + 1;
    endsizetag = slicedsize.indexOf("[/size]");
    sizedtext = slicedsize.slice(endsize, endsizetag);
    converted = converted.replace(slicedsize, "<div style=\"display: inline; font-size: " + size + "%;\">" + sizedtext + "</div>");
  }
  
  loop = i;
  while (converted.includes("[hide=")) {
    begbeg = converted.indexOf("[hide=");
    endend = converted.indexOf("[/hide]") + 7;
    
    slicedhide = converted.slice(begbeg, endend);
    
    endbeg = slicedhide.indexOf("[/hide]")
    hidelabel = slicedhide.slice(6, slicedhide.indexOf("]"));
    hidecontent = slicedhide.slice(slicedhide.indexOf("]") + 1, endbeg);
    if (hidecontent.slice(0, 1) === "\n") {
      hidecontent = hidecontent.slice(1, hidecontent.length);
    }
    
    slicedhide = converted.slice(begbeg, endbeg)
    replacetext = "<button id=\"" + (hides.length+1) + "hide\" class=\"hide-tag\">" + hidelabel + "</button><div id=\"" + (hides.length+1) + "hide-content\" class=\"hidden\">" + hidecontent + "</div>";
    
    converted = converted.replace(converted.slice(begbeg, endend), replacetext);
    i += 1;
    hides.push(hides.length+1);
    
  }
  
  while (converted.includes("\n"))  {
    converted = converted.replace("\n", "<br>");
  }
  return converted;
}

function toggleshow(num) {
  
  var element = document.getElementById(num + "hide-content");
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    element.classList.add("shown");
  }
  else if (element.classList.contains("shown")) {
    element.classList.remove("shown");
    element.classList.add("hidden");
  }
}
