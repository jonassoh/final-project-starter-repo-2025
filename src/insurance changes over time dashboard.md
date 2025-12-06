---
theme: dashboard
title: insurance changes over time dashboard
toc: false
---

<!-- Jonas' visualizations -->
```js
const debt = await FileAttachment("./data/med_debt_by_state.csv").csv({ typed: true });
const colMedian = "Median medical debt in collections in $2023"

const medianDebt = debt.flatMap(d => [
  {
    year: d.Year,
    state: d["State Abbreviation"],
    group: "Median",
    value: d[colMedian]
  }
]);

//split into rows of 10 states for median debt
const states10 = [...new Set(medianDebt.map(d => d.state))].slice(0, 10);
const med_debt10 = medianDebt.filter(d => states10.includes(d.state));

const states20 = [...new Set(medianDebt.map(d => d.state))].slice(10, 20);
const med_debt20 = medianDebt.filter(d => states20.includes(d.state));

const states30 = [...new Set(medianDebt.map(d => d.state))].slice(20, 30);
const med_debt30 = medianDebt.filter(d => states30.includes(d.state));

const states40 = [...new Set(medianDebt.map(d => d.state))].slice(30, 40);
const med_debt40 = medianDebt.filter(d => states40.includes(d.state));

const states50 = [...new Set(medianDebt.map(d => d.state))].slice(40, 50);
const med_debt50 = medianDebt.filter(d => states50.includes(d.state));
```

```js
const colShare = "Share with medical debt in collections"

const shareDebt = debt.flatMap(d => [
  {
    year: d.Year,
    state: d["State Abbreviation"],
    group: "Share",
    value: d[colShare]
  }
]);

//split into rows of 10 states for share (% population) in debt
const share_debt10 = shareDebt.filter(d => states10.includes(d.state));
const share_debt20 = shareDebt.filter(d => states20.includes(d.state));
const share_debt30 = shareDebt.filter(d => states30.includes(d.state));
const share_debt40 = shareDebt.filter(d => states40.includes(d.state));
const share_debt50 = shareDebt.filter(d => states50.includes(d.state));
```

```js
function smallMultiples(data, { width } = {}, legend, title, yDomain, yLabel, yFormat = "s") {
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
      domain: [0, 1800]
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

display(resize(width => smallMultiples(med_debt10, { width }, true, "Median Medical Debt by State over Time")));
display(resize(width => smallMultiples(med_debt20, { width }, false)));
display(resize(width => smallMultiples(med_debt30, { width }, false)));
display(resize(width => smallMultiples(med_debt40, { width }, false)));
display(resize(width => smallMultiples(med_debt50, { width }, false)));


// display(resize(width => smallMultiples(share_debt10, { width }, true, "Share of Medical Debt by State over Time")));
// display(resize(width => smallMultiples(share_debt20, { width }, false)));
// display(resize(width => smallMultiples(share_debt30, { width }, false)));
// display(resize(width => smallMultiples(share_debt40, { width }, false)));
// display(resize(width => smallMultiples(share_debt50, { width }, false)));
```

```js
// Prepare data for income vs debt scatterplot, excluding 2020 and 2023
const incomeDebtData = debt.map(d => ({
  year: d.Year,
  state: d["State Abbreviation"],
  medianDebt: d[colMedian],
  avgIncome: d["Average household income in $2023"] // Adjust column name if different
})).filter(d => d.avgIncome != null && d.medianDebt != null && d.year !== 2020 && d.year !== 2023);

// Get unique years for faceting
const years = [...new Set(incomeDebtData.map(d => d.year))].sort();
```

```js
function incomeDebtScatterplot(data, { width } = {}, title, columns, incomeExtent, debtExtent) {
  return Plot.plot({
    width,
    height: 350,
    marginLeft: 60,
    marginRight: 20,
    marginTop: title ? 40 : 30,
    marginBottom: 60,
    title: title,
    facet: {
      data: data,
      x: "year",
      columns: columns
    },
    fx: {
      label: "Year"
    },
    x: {
      label: "Average Household Income ($)",
      grid: true,
      tickFormat: "~s",
      domain: incomeExtent
    },
    y: {
      label: "Median Medical Debt ($)",
      grid: true,
      tickFormat: "~s",
      domain: debtExtent
    },
    marks: [
      Plot.frame(),
      // Regression line for each year
      Plot.linearRegressionY(data, {
        x: "avgIncome",
        y: "medianDebt",
        fx: "year",
        stroke: "#3b82f6",
        strokeWidth: 2,
        strokeOpacity: 0.6
      }),
      // Scatter points
      Plot.dot(data, {
        x: "avgIncome",
        y: "medianDebt",
        fx: "year",
        fill: "#3b82f6",
        r: 3,
        fillOpacity: 0.7,
        tip: true,
        title: d => `${d.state}\nIncome: ${d3.format(",.0f")(d.avgIncome)}\nDebt: ${d3.format(",.0f")(d.medianDebt)}`
      })
    ]
  });
}

// Split into two rows as evenly as possible
const midpoint = Math.ceil(years.length / 2);
const firstRowYears = years.slice(0, midpoint);
const secondRowYears = years.slice(midpoint);

const firstRowData = incomeDebtData.filter(d => firstRowYears.includes(d.year));
const secondRowData = incomeDebtData.filter(d => secondRowYears.includes(d.year));

// Calculate global scales across all data
const incomeExtent = d3.extent(incomeDebtData, d => d.avgIncome);
const debtExtent = d3.extent(incomeDebtData, d => d.medianDebt);

display(resize(width => incomeDebtScatterplot(firstRowData, { width }, "Median Medical Debt vs Average Household Income by Year", firstRowYears.length, incomeExtent, debtExtent)));
display(resize(width => incomeDebtScatterplot(secondRowData, { width }, null, secondRowYears.length, incomeExtent, debtExtent)));
```


