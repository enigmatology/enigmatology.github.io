topButton = document.getElementById("goToTop");
window.onscroll = function() {scrollFunc()};

function scrollFunc() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topButton.style.display = "block";
  } 
  else {
    topButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
