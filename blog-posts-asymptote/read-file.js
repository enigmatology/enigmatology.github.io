function readFile(file) {
  const fs = require('fs') 

  fs.readFile('Input.txt', (err, data) => { 
      if (err) throw err; 

      return data.toString()); 
  }) 
}

function addFile(fileContents) {
  document.getElementById("blog-post").textContent = fileContents;
}
