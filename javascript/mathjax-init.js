pagejax();

function pagejax() {
  let jax = document.createElement("script");
  jax.setAttribute("id", "pagejax-init");
  jax.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
  document.head.appendChild(jax);
}

function startprintjax() {
  let oldjax = document.getElementById("pagejax-init");
  oldjax.remove();
  
  let newjax = document.createElement("script");
  newjax.setAttribute("id", "pagejax-init");
  newjax.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  document.head.appendChild(newjax);
}

function endprintjax() {
  let oldjax = document.getElementById("pagejax-init");
  oldjax.remove();
  
  let newjax = document.createElement("script");
  newjax.setAttribute("id", "pagejax-init");
  newjax.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
  document.head.appendChild(newjax);
}

body.onbeforeprint = function() {
  startprintjax();
  alert("starting print");
}

body.onafterprint = function() {
  endprintjax();
  alert("ending print");
}
