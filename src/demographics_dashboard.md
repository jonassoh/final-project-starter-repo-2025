---
theme: dashboard
title: demographics dashboard
toc: false
---

<!-- Jonas' visualizations -->
```js
const debt = await FileAttachment("./data/med_debt_by_state.csv").csv({ typed: true });
```

```js
const colWhite = "Median medical debt in collections in $2023 - Majority White";
const colColor = "Median medical debt in collections in $2023 - Majority of Color";

const debtLong = debt.flatMap(d => [
  {
    year: d.Year,
    state: d["State Abbreviation"],
    group: "White",
    value: d[colWhite]
  },
  {
    year: d.Year,
    state: d["State Abbreviation"],
    group: "Color",
    value: d[colColor]
  }
]);
```

```js
//split into rows of 10 states
const states10 = [...new Set(debtLong.map(d => d.state))].slice(0, 10);
const debt10 = debtLong.filter(d => states10.includes(d.state));

const states20 = [...new Set(debtLong.map(d => d.state))].slice(10, 20);
const debt20 = debtLong.filter(d => states20.includes(d.state));

const states30 = [...new Set(debtLong.map(d => d.state))].slice(20, 30);
const debt30 = debtLong.filter(d => states30.includes(d.state));

const states40 = [...new Set(debtLong.map(d => d.state))].slice(30, 40);
const debt40 = debtLong.filter(d => states40.includes(d.state));

const states50 = [...new Set(debtLong.map(d => d.state))].slice(40, 50);
const debt50 = debtLong.filter(d => states50.includes(d.state));
```

```js
function smallMultiples(data, { width } = {}, legend, title) {
  return Plot.plot({
    width,
    height: 250,
    marginLeft: 60,
    marginRight: 20,
    marginTop: title ? 40 : 30,
    title: title,
    facet: {
      data,
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
      label: "↑ Debt ($)",
      grid: true,
      tickFormat: "s",
      domain: [0, 2000]
    },
    color: {
      type: "categorical",
      domain: ["White", "Color"],
      range: ["steelblue", "firebrick"],
      legend: legend
    },
    marks: [
      Plot.frame(),
      Plot.line(data, {
        x: "year",
        y: "value",
        stroke: "group",
        strokeWidth: 1.5,
        fx: "state"
      }),
      Plot.dot(data, {
        x: "year",
        y: "value",
        fill: "group",
        r: 2,
        fx: "state",
        tip: true
      }),
      Plot.ruleY([0])
    ]
  });
}

display(resize(width => smallMultiples(debt10, { width }, true, "Median Medical Debt by State and Ethnicity")));
display(resize(width => smallMultiples(debt20, { width }, false)));
display(resize(width => smallMultiples(debt30, { width }, false)));
display(resize(width => smallMultiples(debt40, { width }, false)));
display(resize(width => smallMultiples(debt50, { width }, false)));
```

<!-- notes -->
Immediately, we can observe that there is typically little difference in the median medical debt between white people and people of color. 

Certain states were missing data for majority people of color but we included them as the visualization since they show an important pattern. Notably, across the entire nation, we can see that there was a large spike in medical debt during 2023. It is also apparent that for many states had either decreasing (such as Colorado and Oregon) or stagnant (such as New York and Pennsylvania) medical debt across the two populations. 

<div id="tableauVizIncome" 
  style="width: 100%; height: 800px;">
</div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script> 
<script type="module"> 
  const vizUrl = "https://public.tableau.com/views/67336DashboardPart1/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
  const viz = new tableau.Viz( document.getElementById("tableauVizIncome"), 
  vizUrl, { hideTabs: true, hideToolbar: false, width: "110%", height: "800px" } ); 
</script>

We wanted to have a visualization that enables viewers to straightforwardly compare the average household income for each U.S. state over time, spanning from 2011 to 2023. During the data cleaning process, the years 2020 and 2023 were removed due to inconsistencies and missing values in the dataset. Therefore, this visualization will focus on the remaining years with reliable information from the dataset. This map applies a sequential color palette, which is necessary as household income is a continuous quantitative variable where higher values will indicate higher average income labels. The intensity of the color enables viewers to quickly distinguish between states with relatively low or high income levels for any given year. For clear and efficient interpretation, we have eliminated chart junk by using a clear and simple layout with clearly defined labels. To the right, the year filter on the right enables viewers to explore how income levels can change over time.

<!-- Yari's visualizations -->

<div id="tableauVizOther" style="width: 100%; height: 800px;"></div>

<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script>

<script type="module">
  const vizUrl = "https://public.tableau.com/views/Phase2_17639472579420/Dashboard1";
  
  const viz = new tableau.Viz(
    document.getElementById("tableauVizOther"),
    vizUrl,
    {
      hideTabs: true,
      hideToolbar: false,
      width: "110%",
      height: "800px"
    }
  );
</script>

We can see from the Age & Charges bar graph that the groups with the highest medical charges are people aged 18-19 and older than 43 years old. The second visualization for Gender shows there is not a large difference medical charges across females compared to males. 

One interesting obervation is how nearly two-thirds of the individuals who have medical debt are insured by their employer. This could indicate that companies are not providing sufficient funds for insurance, medical charges have gotten more expensive than what companies could offer, or both.