---
theme: dashboard
title: insurance changes over time dashboard
toc: false
---

# Medical Debt Over Time

Medical debt is a key factor in identifying issues in the healthcare system and their severity. By analyzing historical trends in medical debt, share, and health insurance coverage, we emphasize the key features of the US healthcare system that have changed from 2011 to 2023, and how these changes contribute to the rising medical debt.

The visualizations present compelling evidence of rising medical debts, the urgency of the matter, and how these key metrics relate to one another. The goal of this dashboard is to answer the question: **"How have key features of the U.S. health insurance system (coverage rates, out-of-pocket costs, and premiums) changed over time, and how have these changes influenced medical debt?"**

## Visualizations:

<div id="tableauVizIncome" 
  style="width: 100%; height: 800px;">
</div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script> 
<script type="module"> 
  const vizUrl = "https://public.tableau.com/views/Dashboard1LineChart-MedicalDebtOverTime/LineChartMedicalDebtOverTime?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
  const viz = new tableau.Viz( document.getElementById("tableauVizIncome"), 
  vizUrl, { hideTabs: true, hideToolbar: false, width: "50%", height: "800px" } ); 
</script>

The plots above indicate that the share of medical debt has continually decreased, down to just 6% in 2023, while the proportion of individuals without health insurance has stagnated around 10% from 2018 - 2023. 

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
      domain: [0, 2000]
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

```

While many states showed mostly stagnant or decreasing trends in medical debt, every state saw a massive spike in median medical debt in 2023. 

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

The scatterplots above demonstrate the historical trend for lower income households to experience higher medical debts, which is more nuemrically and proportional to their annual income. 

Overall, our analysis shows improvements in reducing medical share and proportion of uninsured individuals but an increase in medical debt across all states. 

## Process of Designing the Dashboard

text

## Design Rationale

Our dashboard utilizes three visualizations to capture the trends of many of the variables related to medical debt:
1. **Line Plot + Visual Map:** A line plot was chosen to show the general trends in the percent of the population with medical debt and health insurance coverage over time. This chart emphasizes the downward trend in both categories and the stabilization of health insurance coverage. 

2. **Small Multiples (Line Plot):** A small multiple of line plots were used to show the general trends in medical debt of each state. This visualization allows for easy comparison between states and highlights when median debt is increasing (bad) and decreasing (good) using red and blue lines.
3. **Small Multiples (Scatter Plot):** A small multiple of scatter plots were used to show the general relationship between medical debt and average household income over the years. This visualization enables easy comparison and highlights the consistent inverse relationship with a trend line. 


## Tool(s)

We used the following tools for our visualizations:

1. **Tableau:** This tool allowed us to efficiently create simple visualizations (like standalone line plots) to show the trends in our data without complication or chart junk.

2. **Observable Framework** This tool allowed for further customization in framing in the small multiples, allowing users to easily follow the grid of line charts. The flexibility to adjust line colors on increase or decrease allows for users to easily identify similarities and differences between states at certain time intervals.

## Connecting Medical Debt Over Time to Systemic Healthcare Issues

text

## References

1. maybe

2. Fredric Blavin, Breno Braga, Noah Johnson, Apueela Wekulom. 2024. The Changing Medical Debt Landscape in the United States. Accessible from https://datacatalog.urban.org/dataset/changing-medical-debt-landscape-united-states.

