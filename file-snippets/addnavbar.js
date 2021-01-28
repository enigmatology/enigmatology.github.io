var navbardiv = document.getElementById("navbar");
(function () {
  var xhttp = new XMLHttpRequest();	
  xhttp.open("GET", "https://wgvozdjak.github.io/file-snippets/navbar", true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      navbardiv.innerHTML = this.responseText;
    }
  }
})();
