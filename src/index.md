---
toc: true
---

# Medical Debt in the United States

*By Jonas Soh, Rita Xiao, and Yari Gonzalez*

## Background

The social issue that we are exploring is medical debt in the United States. Unlike many other developed countries, medical debt is a widespread and persistent problem, affecting an estimated 41% of American adults according to KFF polling. Medical debt does not occur in isolation, rather, it is tied to deeper systemic issues such as inequitable access to health insurance, inconsistent policy protections, racial and socioeconomic disparities, and rising healthcare costs over time. These issues create spaces where certain communities repeatedly face worse health and financial outcomes, which often results in long-term instability and economic hardship. Through national and neighborhood level data, our project aims to answer these factors and show how medical debt continues to reflect long standing inequities embedded within the U.S. healthcare system.

## Thesis Statement

We want to convey to our audience how medical debt has evolved over time, how it intersects with structural inequities like redlining, and which communities are most impacted by rising healthcare costs. Our visualizations highlight national trends in insurance coverage and medical debt, reveal current disparities in historically redlined areas, and examine how demographic factors such as race, gender, age, and income contribute to unequal health outcomes. We aim to show that medical debt is not an individual problem but a systemic issue shaped by policy decisions, geographic inequality, and barriers to insurance access.

## Data Sources

We utilized key datasets from reliable sources ranging from publicly available yet thorough surveys to government supported reports. One of our primary datasets we will use is *The Changing Medical Debt Landscape in the United States*, which was recently updated in 2024 with crucial information on medical debt, demographics, and income from 2011 up until 2023. Additionally, we will utilize the following datasets: *Figure 1 the Residential Security Map of Pittsburgh, Pennsylvania....*, *What Is Your State Doing to Affect Access to Individual Market Coverage?*, *Medical Cost Personal Datasets.*, and *The State of Health Insurance Coverage in the U.S.* We carefully selected these datasets for their relevancy to our goals of showing the current state of the healthcare system on the population and call for action for change if our findings deem it necessary.

## Audience and Purpose

Our primary audience includes policymakers, nonprofit organizations, healthcare advocates, and community members who may be directly or indirectly affected by medical debt. These groups play an important role in shaping conversations around healthcare reform and equitable policy solutions. Our purpose is to help viewers understand how the healthcare system’s structure, insurance coverage rates, premiums, out-of-pocket costs, and historical discrimination, contributes to disparities in medical debt. We want our dashboards to spark discussion with the support of data-driven decision-making to empower stakeholders to advocate for more accessible, equitable, and sustainable healthcare solutions in the United States.

## Goal Questions

1. Track Changes over Time: How have key features of the U.S. health insurance system (coverage rates, out-of-pocket costs, and premiums) changed over time, and how have these changes influenced medical debt?
2. Examine modern redlining: Is redlining discrimination still occurring within U.S. healthcare or insurance systems, even though formal redlining is illegal?
3. Identify most impacted groups: Which demographic groups (race, gender, age, socioeconomic status) are most affected by medical debt, and what systemic conditions intensify these disparities?

## Visualizations

<div class="grid grid-cols-2" style="margin: 3rem 0;">
  <div class="card">
    <h2>See the</h2>
    <a href="./insurance-changes-over-time-dashboard">Insurance Changes Over Time</a>
  </div>

  <div class="card">
    <h2>See the</h2>
    <a href="./demographics-dashboard">Demographic Patterns</a>
  </div>

  <div class="card">
    <h2>See the</h2>
    <a href="./potential-redlining">Potential Redlining</a>
  </div>
</div>

```js
import {smallMultiples} from "./components/med_debt_over_time.js";

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

display(resize(width => smallMultiples(med_debt10, { width }, true, "Median Medical Debt by State over Time")));
display(resize(width => smallMultiples(med_debt20, { width }, false)));
display(resize(width => smallMultiples(med_debt30, { width }, false)));
display(resize(width => smallMultiples(med_debt40, { width }, false)));
display(resize(width => smallMultiples(med_debt50, { width }, false)));
```



## Conclusion

### Lessons Learned

This project has deepened our understanding of the systematic factors that shaped medical debt in the United States. By developing three interconnected dashboards, which integrated redlining patterns, demographic disparities, health insurance coverage, and various medical debt trends over time, we were able to draw meaningful connections between systematic inequities and the financial burdens faced by Americans country wide. Tableau and ArcGIS were the main tools we used for the project to create interactive visualizations that effectively and clearly communicated our data and its narrative. This makes it easier for our audience to access and understand the complex patterns present within the datasets. One key lesson that we learned from the project is the interconnectedness of the factors that contribute to medical debt. For instance, certain changes in premiums or differences in household income can affect a community’s ability to recover from debt. These financial pressures can overlap with historical inequities such as the long-term effects of redlining in the United States, which continue to impact neighborhood access to resources such as quality healthcare and adequate insurance coverage today. Our findings reinforced how systematic issues can persist across time, which could affect low-income communities and communities of color. When analyzing geographic and demographic patterns, we observed that medical debt does not affect all communities equally. Certain regions consistently showed higher burdens, reflecting broader systemic conditions that could leave communities vulnerable to medical debt. Another important takeaway was recognizing the importance of data visualization in communicating complex issues. While medical debt is a well documented and discussed problem, seeing the trends visually, such as the debt patterns by race, age, state, or household income, could make the issue more immediate and relatable. Visual storytelling helped reveal patterns that may originally be hard to notice in raw datasets, and it also enabled us to communicate the information in a way that is more engaging for diverse audiences. This project also highlighted the importance of making data more accessible to diverse audiences, especially those that may be increasingly involved in conversations about healthcare equity and related policies. 

## Future Implications

Medical debt is a pressing challenge within the United States’ healthcare system. It affects not only individuals’ financial stability, but also can impact their long-term health and overall quality of life. Our work highlights how medical debt is not just an isolated issue, but also the result of a broader systematic issue. Thus, there is a need for change, perhaps a systemic reform that addresses the inequities embedded in healthcare affordability as well as the lingering effects of redlining. These insights really showed an important message: medical debt is not simply due to individual choices but rather by structures. Based on the lessons we have learned from this project, from the challenges that we overcame  to learning how to use the tools to visualize the issue, we have gained a clearer sense of purpose and understanding of how to illuminate issues that may have gone unnoticed otherwise. While our visualizations and insights shown in this dashboard may be a step to clarifying the issue, true progress will come when these insights drive informed actions to address root causes of medical debt. Let this project remind others of the potential of data visualization to illuminate important issues and encourage individuals to take informed action to reduce medical debt.

## Challenges

Throughout the project, we faced several challenges that were overcome via problem-solving skills, collaboration, and learning. One major issue encountered was when working with unclean datasets that were formatted in ways that made data analysis difficult. For example, many fields were stored as strings rather than integer (numeric) values, which required us to convert and restructure them before building visualizations. In some cases, certain datasets did not reveal the trends we expected, prompting us to rethink chart types or remove visualizations that did not contribute to our narrative. 

In Tableau, we also experienced some limitations when creating charts that effectively conveyed our story. We wanted to ensure that each dashboard clearly illustrated key patterns. In ArcGIS, there was a struggle with joining layers with tables and handling inconsistent integer data, which required additional cleaning and careful data management. Additionally, some visualizations initially did not support insights we aimed to highlight, which led us to the decision of reevaluating what visualizations we were going to include or remove. Overall, despite our challenges, our design choices allowed us to clearly show how national health insurance trends relate to medical debt, how redlining shapes inequities in coverage today, and identify which demographic groups are negatively impacted by medical debt. 

