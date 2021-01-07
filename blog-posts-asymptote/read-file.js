/*function readFile(file) {
  const fs = require('fs') 

  fs.readFile(file, (err, data) => { 
      if (err) throw err; 

      return data.toString()); 
  }) 
}*/

function addFile() {
  /*
  var fileContents = readFile("test-post.txt");*/
  var fr = new FileReader();
  fr.onload = function() {
    document.getElementById("blog-post").textContent = fr.result;
  }
  
  fr.readAsText("test-post.txt");
}
