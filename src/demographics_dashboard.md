---
theme: dashboard
title: Demographics Affected
toc: false
---

# Demographic Patterns with Medical Debt 

Medical debt remains a pervasive challenge in the United States, affecting certain demographic groups. This financial burden is often related to existing inequalities, such as race, gender, age, and socioeconomic status, which can impact both healthcare access and an individual’s ability to pay medical expenses. By analyzing patterns in medical debt across these demographics, this dashboard reveals underlying systemic conditions that contributed to medical debt and highlights the populations most vulnerable to healthcare inequities. The goal of this dashboard is to answer the question: **“Which demographic groups (race, gender, age, socioeconomic status) are most affected by medical debt, and what systemic conditions intensify these disparities?”**


## Visualizations:
The visualizations below are meant to provide a clear narrative of how demographic factors intersect with medical debt, and display the disparities throughout the United States.
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
<!-- Immediately, we can observe that there is typically little difference in the median medical debt between white people and people of color.  -->

Immediately, we can observe the following:
- There is typically little difference in the median medical debt between white people and people of color.
- Notably, across the entire nation, we can see that there was a large spike in medical debt during 2023. 
- It is also apparent that for many states had either decreasing (such as Colorado and Oregon) or stagnant (such as New York and Pennsylvania) medical debt across the two populations.


<!-- Certain states were missing data for majority people of color but we included them as the visualization since they show an important pattern. Notably, across the entire nation, we can see that there was a large spike in medical debt during 2023. It is also apparent that for many states had either decreasing (such as Colorado and Oregon) or stagnant (such as New York and Pennsylvania) medical debt across the two populations.  -->

<div id="tableauVizIncome" 
  style="width: 100%; height: 800px;">
</div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script> 
<script type="module"> 
  const vizUrl = "https://public.tableau.com/views/AverageHouseholdIncomeandMedicalDebtMapbyYear/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
  const viz = new tableau.Viz( document.getElementById("tableauVizIncome"), 
  vizUrl, { hideTabs: true, hideToolbar: false, width: "90%", height: "800px" } ); 
</script>

<!-- We wanted to have a visualization that enables viewers to straightforwardly compare the average household income for each U.S. state over time, spanning from 2011 to 2023. During the data cleaning process, the years 2020 and 2023 were removed due to inconsistencies and missing values in the dataset. Therefore, this visualization will focus on the remaining years with reliable information from the dataset. This map applies a sequential color palette, which is necessary as household income is a continuous quantitative variable where higher values will indicate higher average income labels. The intensity of the color enables viewers to quickly distinguish between states with relatively low or high income levels for any given year. For clear and efficient interpretation, we have eliminated chart junk by using a clear and simple layout with clearly defined labels. To the right, the year filter on the right enables viewers to explore how income levels can change over time. -->

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
      width: "90%",
      height: "800px"
    }
  );
</script>

<!-- We can see from the Age & Charges bar graph that the groups with the highest medical charges are people aged 18-19 and older than 43 years old. The second visualization for Gender shows there is not a large difference medical charges across females compared to males. 

One interesting obervation is how nearly two-thirds of the individuals who have medical debt are insured by their employer. This could indicate that companies are not providing sufficient funds for insurance, medical charges have gotten more expensive than what companies could offer, or both. -->

Our analysis shows that medical debt in the United States follows clear patterns across demographic groups and states:

- Notably, across the span of approximately 10 years, Wyoming has one of the darkest shades, indicating a higher average medical debt in the state. 
- There does not seem to have a clear relationship between household income and medical debt. 
- We can see from the Age & Charges bar graph that the groups with the highest medical charges are people aged 18-19 and older than 43 years old. 
- The second visualization for Gender shows there is not a large difference in medical charges across females compared to males.
- One interesting observation is how nearly two-thirds of the individuals who have medical debt are insured by their employer. This could indicate that companies are not providing sufficient funds for insurance, medical charges have gotten more expensive than what companies could offer, or both.



## Process of Designing the Dashboard

To start off, we conducted searches to find reliable data sources, which would help us visualize data on potential demographic disparities. After discussion within the team, we selected the Medical Cost Personal Dataset from Kaggle, a dataset from the commonwealth fund, and The Changing Medical Debt Landscape in the United States from Urban Data Catalog. After we decided which data sources to use for this dashboard, we looked over the fields and data, and decided what data stories to narrate. From this, we developed 5 visualizations, which aims to visualize the demographic disparities within the US.


## Design Rationale

Our dashboard incorporates 3 distinct visualizations to provide a comprehensive overview of the demographic disparities within the United States over time:

1. **Small Multiples:** The first visualization we chose to display changes in median medical debt by state and ethnicity over time was a small multiple. Certain states were missing data for majority people of color but we included them as the visualization since they show an important pattern. The small multiple used consistent visual design to ensure viewers can compare and observe any changes. Two distinct colors are applied to distinguish between ethnicities. We also included clear axes and labels to enable viewers to easily observe patterns. 
2. **Choropleth Map:** We wanted to have a visualization that enables viewers to straightforwardly compare the average medical debt for each U.S. state over time, spanning from 2011 to 2023. During the data cleaning process, the years 2020 and 2023 were removed due to inconsistencies and missing values in the dataset. Therefore, this visualization will focus on the remaining years with reliable information from the dataset. This map applies a sequential color palette, which is necessary as household income is a continuous quantitative variable where higher values will indicate higher average income labels. The intensity of the color enables viewers to quickly distinguish between states with relatively low or high income levels for any given year. For clear and efficient interpretation, we have eliminated chart junk by using a clear and simple layout with clearly defined labels. To the right, the year filter slider on the right enables viewers to explore how income levels can change over time.
3. **Bar Charts:** We also decided to add 3 bar charts that enable viewers to compare how medical charges and medical debt vary across age, gender, and insurance type in the United States. The age-based bar chart applies a simple layout so that viewers can more easily compare how medical charges fluctuate across ages. The Gender and Medical Charges Bar Chart uses two colors in the legend to distinguish between genders (red for female, blue for male). This chart highlights the total charges for each gender, so viewers can straightforwardly compare the data. The insurance type bar chart focuses on the percent of insured people who have  medical debt in the U.S. and also the insurance types. We also used various colors to distinguish between the types of insurances (Employer, Individual+Marketplace, Medicaid, Medicare, Other). Together, these three bar charts provide a straightforward way for viewers to compare and explore how medical charges and medical debt can vary by age, gender, and insurance type. 


## Tool(s)

**Tableau** was selected, as it has the capacity to create interactive and dynamic visualizations. The presence of filters within Tableau allows users to explore patterns across multiple demographic dimensions, where they can decide to filter by year or state and quickly identify populations at greatest risk.

## Connecting Demographic Disparities to Systemic Healthcare Issues

Demographic disparities are often noted as one of the primary drivers of unequal medical debt in the United States. Factors such as race, gender, age, socioeconomic status, and insurance coverage all can impact individuals, and accumulate medical debt (Bennett et al., 2021). Certain groups are consistently facing higher costs, reduced access to quality healthcare, and greater financial strain. As medical debt has continued to grow across the country, disproportionately affecting communities with lower incomes, limited insurance options, and other systematic disadvantages. The issue is that its burden is distributed unevenly, reflecting larger inequities within the healthcare system. The goal of this dashboard is to increase awareness of how demographic factors shape medical debt outcomes and encourage deeper understanding of these systemic barriers that cause issues for some groups. 

## References

1. CHOI, M. (2017). *Medical Cost Personal Datasets*. Published online at kaggle.com. Retrieved from https://www.kaggle.com/datasets/mirichoi0218/insurance.
https://www.kaggle.com/datasets/mirichoi0218/insurance.

2. Collins, S. and Gupta, A. (2024). *The State of Health Insurance Coverage in the U.S. The Commonwealth Fund*. Published online at commonwealthfund.org. Retrieved from doi:https://doi.org/10.26099/byce-qc28.

3. Fredric Blavin, Breno Braga, Noah Johnson, Apueela Wekulom. 2024. The Changing Medical Debt Landscape in the United States. Accessible from https://datacatalog.urban.org/dataset/changing-medical-debt-landscape-united-states.