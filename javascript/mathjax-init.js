function startprintjax() {
  MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "SVG"]);
  MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
}

function endprintjax() {
  MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "CommonHTML"]);
  MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
}

document.body.onbeforeprint = function() {
  startprintjax();
}

document.body.onafterprint = function() {
  endprintjax();
}
