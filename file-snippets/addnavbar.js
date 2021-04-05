var navbardiv = document.getElementById("navbar");
(function () {
  var xhttp = new XMLHttpRequest();	
  xhttp.open("GET", "https://enigmatology.github.io/file-snippets/navbar", true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      navbardiv.innerHTML = this.responseText;
    }
  }
})();

function openNav() {
  document.getElementById("topnav").style.width = "250px";
}

function closeNav() {
  document.getElementById("topnav").style.width = "0";
}
