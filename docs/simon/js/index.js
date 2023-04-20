/* global scrollama */
import VisController from "./VisController.js";

const scroller = scrollama();
const { overallUr, overallIr } = VisController;

// const steps = document.querySelectorAll(".step");
const fadeTime = 5;

document.querySelector("#toggle").addEventListener("click", () => {
  toggle();
});

const cbs = [
  { cb: overallUr, args: [false] },
  { cb: overallUr, args: [true] },
  { cb: overallIr, args: [false] },
  { cb: overallIr, args: [true] },
];

function fadeOut(element) {
  let op = 1; // initial opacity
  let timer = setInterval(() => {
    if (op <= 0.1) {
      clearInterval(timer);
      //   element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, fadeTime);
}

function fadeIn(element) {
  let op = 0.1; // initial opacity
  //   element.style.display = "block";
  let timer = setInterval(() => {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, fadeTime);
}

scroller
  .setup({ step: ".step" })
  .onStepEnter(({ element, index }) => {
    fadeIn(element);
    cbs[index].cb.apply(null, cbs[index].args);
  })
  .onStepExit(({ element }) => {
    fadeOut(element);
  });

window.addEventListener("resize", scroller.resize);
