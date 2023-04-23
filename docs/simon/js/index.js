/* global scrollama */
import VisController from "./VisController.js";

const scroller = scrollama();
const { overallUr, overallIr, alignedComparison, ethnicityUr, ethnicityUrSetIndexDate, renderUrMap } = VisController;

// const steps = document.querySelectorAll(".step");
const fadeTime = 5;

// Start action
document.querySelector("#startButton").addEventListener("click", () => {
  document.querySelector("#overview").scrollIntoView({ behavior: "smooth" });
});

// ur-by-ethnicity interactions
document.querySelector("#endOfGR").addEventListener("click", () => {
  ethnicityUrSetIndexDate(new Date("6/1/2009"));
});
document.querySelector("#endOfCR").addEventListener("click", () => {
  ethnicityUrSetIndexDate(new Date("4/1/2020"));
});

const cbs = [
  { cb: overallUr, args: [false, { "#bottomNote1": "Drag and scroll to zoom select custom date range." }] },
  { cb: overallUr, args: [true, { "#bottomNote1": "Drag and scroll to zoom select custom date range." }] },
  { cb: overallIr, args: [false, { "#bottomNote1": "Drag and scroll to zoom select custom date range." }] },
  { cb: overallIr, args: [true, { "#bottomNote1": "Drag and scroll to zoom select custom date range." }] },
  { cb: alignedComparison, args: ["end", false, { "#bottomNote2": "Mouse over the lines to highlight." }] },
  { cb: alignedComparison, args: ["start", false, { "#bottomNote2": "Mouse over the lines to highlight." }] },
  { cb: alignedComparison, args: ["start", true, { "#bottomNote2": "Mouse over the lines to highlight." }] },
  { cb: ethnicityUr, args: [false, {}] },
  { cb: ethnicityUr, args: [true, { "#bottomNote3": "Mouse over to index by a different date" }] },
  {
    cb: renderUrMap,
    args: [
      "Great Recession (2007 - 09)",
      "COVID-19 Recession (2020)",
      false,
      { "#bottomNote4": "Mouse over and scroll to zoom in" },
    ],
  },
  {
    cb: renderUrMap,
    args: [
      "Great Recession (2007 - 09)",
      "Dot-Bomb Recession (2001)",
      false,
      { "#bottomNote4": "Mouse over and scroll to zoom in" },
    ],
  },
  {
    cb: renderUrMap,
    args: [
      "Great Recession (2007 - 09)",
      "Dot-Bomb Recession (2001)",
      true,
      { "#bottomNote4": "Mouse over and scroll to zoom in" },
    ],
  },
];

function fadeOut(element) {
  let op = 1; // initial opacity
  let timer = setInterval(() => {
    if (op <= 0.1) clearInterval(timer);
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, fadeTime);
}

function fadeIn(element) {
  let op = 0.1; // initial opacity
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
