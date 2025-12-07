import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function smallMultiples(data, { width } = {}, legend, title, yDomain, yLabel, yFormat = "s") {
  const segments = [];
  const byState = d3.group(data, d => d.state);
  
  byState.forEach((stateData, state) => {
    const sorted = stateData.sort((a, b) => a.year - b.year);
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      segments.push({
        state,
        year: current.year,
        year2: next.year,
        value: current.value,
        value2: next.value,
        direction: next.value >= current.value ? "increasing" : "decreasing"
      });
    }
  });

  return Plot.plot({
    width,
    height: 250,
    marginLeft: 60,
    marginRight: 20,
    marginTop: title ? 40 : 30,
    title: title,
    facet: {
      data: segments,
      x: "state",
      columns: 10,
      marginRight: 60
    },
    fx: {
      label: null
    },
    x: {
      type: "linear",
      label: "Year →",
      tickFormat: d3.format("d"),
      ticks: 3
    },
    y: {
      label: yLabel,
      grid: true,
      tickFormat: yFormat,
      domain: yDomain || [0, 2000]
    },
    color: {
      type: "categorical",
      domain: ["increasing", "decreasing"],
      range: ["#ef4444", "#22c55e"],
      legend: legend
    },
    marks: [
      Plot.frame(),
      Plot.link(segments, {
        x1: "year",
        y1: "value",
        x2: "year2",
        y2: "value2",
        stroke: "direction",
        strokeWidth: 1.5,
        fx: "state"
      }),
      Plot.dot(data, {
        x: "year",
        y: "value",
        fill: "currentColor",
        r: 1,
        fx: "state",
        tip: true
      }),
      Plot.ruleY([0])
    ]
  });
}