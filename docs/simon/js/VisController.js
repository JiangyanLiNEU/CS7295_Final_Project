import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import economyCharts from "https://api.observablehq.com/d/d3c7315f35caef69.js?v=3";
import urComparison from "https://api.observablehq.com/d/d8ee95eeee07f719.js?v=3";
import urByEthnicity from "https://api.observablehq.com/d/a343beacb0bc740a.js?v=3";
import urGeo from "https://api.observablehq.com/d/7583eceebc56b08f.js?v=3";

const VisController = () => {
  let rendered = null;

  const parseNoteOptions = (noteOptions) => {
    Object.keys(noteOptions).forEach((key) => {
      document.querySelector(key).innerHTML = noteOptions[key];
    });
  };

  const overallUr = (isHighlighted, noteOptions) => {
    rendered = new Runtime().module(economyCharts, (name) => {
      if (name === "focusContextURChart") return new Inspector(document.querySelector("#chart1"));
    });
    rendered && rendered.redefine("highlightRecessionsUR", isHighlighted);
    parseNoteOptions(noteOptions);
  };

  const overallIr = (isHighlighted, noteOptions) => {
    rendered = new Runtime().module(economyCharts, (name) => {
      if (name === "focusContextIRChart") return new Inspector(document.querySelector("#chart1"));
    });
    rendered && rendered.redefine("highlightRecessionsIR", isHighlighted);
    parseNoteOptions(noteOptions);
  };

  const alignedComparison = (alignment, indexed, noteOptions) => {
    rendered = new Runtime().module(urComparison, (name) => {
      if (name === "mainChart") return new Inspector(document.querySelector("#chart2"));
    });
    rendered && rendered.redefine("alignment", alignment);
    rendered && rendered.redefine("indexed", indexed);
    parseNoteOptions(noteOptions);
  };

  const ethnicityUr = (indexed, noteOptions) => {
    rendered = new Runtime().module(urByEthnicity, (name) => {
      if (name === `unemploymentRateByRace${indexed ? "Indexed" : ""}`)
        return new Inspector(document.querySelector("#chart3"));
    });
    parseNoteOptions(noteOptions);
  };

  const ethnicityUrSetIndexDate = (indexDate) => {
    if (rendered && indexDate) {
      rendered.redefine("indexDate", indexDate);
    }
  };

  // Special treat UR Map since redrawing the map is super slow
  const renderUrMap = (left, right, startToPeak, noteOptions) => {
    rendered = new Runtime().module(urGeo, (name) => {
      if (name === "mainChart") return new Inspector(document.querySelector("#chart4"));
      if (name === "legend") return new Inspector(document.querySelector("#legend4"));
    });
    rendered.redefine("leftMap", left);
    rendered.redefine("rightMap", right);
    rendered.redefine("startToPeak", startToPeak);
    document.querySelector(
      "#chart4Title"
    ).innerHTML = `Unemployment Rate Change of US Counties From Recession Start to ${startToPeak ? "Peak" : "End"}`;
    parseNoteOptions(noteOptions);
  };

  return {
    overallUr,
    overallIr,
    alignedComparison,
    ethnicityUr,
    ethnicityUrSetIndexDate,
    renderUrMap,
  };
};

export default VisController();
