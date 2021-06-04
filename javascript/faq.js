let expanders = document.getElementsByClassName("open-faq-btn");
for (let i = 0; i < expanders.length; i++) {
  expanders[i].addEventListener("click", function() {
    this.classList.toggle("active");


    let content = this.nextElementSibling;
    content.classList.toggle("faq-shown");
    if (content.classList.contains("no-border")) {
      content.classList.remove("no-border");
    }
    else {
      window.setTimeout(function() {
        content.classList.add("no-border");
      }, 500);
    }


    let plus = this.firstElementChild;
    if (plus.innerHTML === "+") {
      plus.innerHTML = "–";
    }
    else {
      plus.innerHTML = "+";
    }
  });
}
