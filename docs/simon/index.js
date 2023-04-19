/* global scrollama */

const scroller = scrollama();

const steps = document.querySelectorAll(".step");
const charts = document.querySelectorAll(".chart");

function fadeOut(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 10);
}

function fadeIn(element) {
  var op = 0.1; // initial opacity
  element.style.display = "block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

scroller
  .setup({ step: ".step" })
  .onStepEnter(({ element, index }) => {
    steps.forEach((step) => (step.style.opacity = 0.1));
    element.style.opacity = 1;
    charts[index] && fadeIn(charts[index]);
  })
  .onStepExit(({ element, index, direction }) => {
    charts[index] && fadeOut(charts[index]);
  });

window.addEventListener("resize", scroller.resize);
