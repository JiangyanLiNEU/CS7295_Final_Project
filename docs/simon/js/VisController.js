import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import economyCharts from "https://api.observablehq.com/d/d3c7315f35caef69.js?v=3";
import urComparison from "https://api.observablehq.com/d/d8ee95eeee07f719.js?v=3";

const VisController = () => {
  let rendered = null;
  //   let urHighlight = false;
  //   let irHighlight = false;
  //   let comparisonAlignment = "end";

  const overallUr = (isHighlighted) => {
    rendered = new Runtime().module(economyCharts, (name) => {
      if (name === "focusContextURChart") return new Inspector(document.querySelector("#chart"));
    });
    rendered && rendered.redefine("highlightRecessionsUR", isHighlighted);
  };

  const overallIr = (isHighlighted) => {
    rendered = new Runtime().module(economyCharts, (name) => {
      if (name === "focusContextIRChart") return new Inspector(document.querySelector("#chart"));
    });
    rendered && rendered.redefine("highlightRecessionsIR", isHighlighted);
  };

  return {
    overallUr,
    overallIr,
  };
};

export default VisController();
