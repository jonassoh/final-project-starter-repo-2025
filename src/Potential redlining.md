---
theme: dashboard
title: potential redlining
toc: false
---

# Potential Health Insurance Redlining

This set of visualizations explores whether the legacy of redlining continues to shape healthcare access and medical debt outcomes today. Despite formal redlining being outlawed in the 1960s, many neighborhoods in Pittsburgh that were historically graded as “hazardous” continue to experience lower insurance coverage and reduced access to health resources. We combined medical debt data at the county level, demographic data at the state level, and race specific uninsured rates across Pittsburgh neighborhoods, to show how patterns of inequality continue to impact health outcomes. This dashboard seeks to show how race and history interact, which will help us understand whether healthcare inequities today reflect the boundaries of redlining in the past.

## Visualizations:

<img src="./data/Pittsburgh.jpg" alt="Description" style="width: 90%;">

<div id="tableauVizIncome" 
  style="width: 80%; height: 800px;">
</div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script> 
<script type="module"> 
  const vizUrl = "https://public.tableau.com/views/Dashboard2BarChart-CostsAcrossSegregatedAreas/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
  const viz = new tableau.Viz( document.getElementById("tableauVizIncome"), 
  vizUrl, { hideTabs: true, hideToolbar: false, width: "115%", height: "800px" } ); 
</script>

This chart compares uninsured rates among 18–34-year-olds across Pittsburgh neighborhoods that were historically redlined by breaking those patterns down by White and Black individuals. We joined neighborhood data with race demographics and insurance coverage by age, which showed that despite redlining not being legal, many redlined communities still have disproportionately high uninsured residents with a high saturation among Black residents. 

<!-- This is for the Scatterplot -->
<div id="tableauViz" 
style="width: 100%; height: 800px;"></div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js">
</script> <script type="module"> 
const vizUrl = "https://public.tableau.com/views/ScatterplotforTermProject/Sheet1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
const viz = new tableau.Viz( document.getElementById("tableauViz"), 
vizUrl, { hideTabs: true, hideToolbar: false, width: "92%", height: "800px" } ); 
</script>

This visualization allows us to examine whether states with a higher percentage of minority residents tend to have higher levels of medical debt. This helps identify redlining-like correlations at the demographic level.

<!-- Here are the arcGIS maps -->
<br></br>

### Medical Debt in Florida Counties in 2012, 2017, 2022
<!-- THis is for the 2012 ArcGIS Florida Map -->
<div>
  <iframe 
    width="30%" 
    height="600" 
    allow="local-network-access; geolocation" 
    title="Medical Debt Across Florida Counties 2012"
    src="https://carnegiemellon.maps.arcgis.com/apps/mapviewer/index.html?configurableview=true&webmap=19e6f9a5d68b42888c434f47748b4acf&theme=light&scroll=false&center=-81.312625,27.916472&scale=4622324.434309&legend=true" >
  </iframe>
    <!-- THis is for the 2017 ArcGIS Florida Map -->
  <iframe 
    width="30%"
    height="600"
    allow="local-network-access; geolocation"
    title="Medical Debt Across Florida Counties 2017"
    src="https://carnegiemellon.maps.arcgis.com/apps/mapviewer/index.html?configurableview=true&webmap=2848ee5f00f24f4eb836ed385c0a648b&theme=light&scroll=false&center=-81.312625,27.916472&scale=4622324.434309&legend=true" >
  </iframe>
    <!-- THis is for the 2022 ArcGIS Florida Map: -->
  <iframe 
    width="30%"
    height="600"
    allow="local-network-access; geolocation"
    title="Medical Debt Across Florida Counties 2022"
    src="https://carnegiemellon.maps.arcgis.com/apps/mapviewer/index.html?configurableview=true&webmap=c719246324ee4bf9a6720252b0970c9e&theme=light&scroll=false&center=-81.5122242660522,28.523878581131317&scale=4622324.434309&legend=true" >
  </iframe>
</div>

The map is shaded according to median medical debt, and includes variables such as hospital market concentration, allowing us to visually identify geographic clusters of disproportionately high debt. We will also overlay additional variables such as race or household income. To make the visualization less confusing and better analyze trends, we zoomed into specific areas with abundant data (Florida), and focused on 2012, 2017, and 2022. 

## Process of Designing the Dashboard

To build this dashboard, we started by identifying datasets that connected historic redlining to modern healthcare outcomes, and then focused on cleaning that data so that we could make accurate comparisons across counties, states, and neighborhoods. We converted strings in our data into numbers, standardized neighborhood names, and joined tables of different data together before we analyzed insurance coverage, race, and medical debt together. For the Choropleth map, we also adjusted our color bins, legend, and layers to make the debt gradient more readable.The Pittsburgh bar chart also required additional filtering, since we matched neighborhood data with historical redlining boundaries to compare uninsured young adults across racial groups. The scatterplot was constructed by merging minority population percentages with medical debt to show demographic correlations. Each visualization supported our question of whether redlining inequities are still visible today.

## Design Rationale

Our dashboard incorporates three visualizations to provide a comprehensive view of Redlining and Medical Debt

1. **Bar Chart:** The horizontal bar chart allows us to see direct neighborhood level comparisons and highlight racial disparities within the same redlined communities. It is simple to communicate magnitude.

2. **Scatterplot:** The scatterplot helped us examine whether broader demographic concentrations correlate with medical debt. This plot showed whether states with more minority residents tend to face higher financial burdens, which suggests inequities rather than separate local issues.

3. **Choropleth Map:** The choropleth map gave us an effective way to reveal geographic clustering and regional inequity. We shaded counties based on median medical debt, so that viewers can instantly see which areas are disproportionately financially burdened.

## Tool(s)

1. **Tableau:** Tableau was used for the bar charts and scatterplots because it is highly flexible and intuitive for comparing numerical variables. It also allowed us to easily join demographic and insurance datasets. Tableau’s features such as color controls and calculated fields helped us highlight disparities clearly.

2. **ArcGIS:** ArcGIS was used for the choropleth map because Tableau’s mapping features were very limited for detailed county level shading and layered geographic boundaries. ArcGIS allowed us to have precise mapping, consistent color bins, zooming into specific regions, and overlaying multiple variables in a coherent way.


## Connecting Redlining to Systemic Healthcare Issues

Historical redlining shaped where investment flowed, who had access to stable employment, and which communities received healthcare resources. Those patterns persist today in the form of unequal insurance access, racial disparities in medical debt, and concentrated financial strain in historically underfunded neighborhoods. Our dashboard shows that counties with higher medical debt overlap with regions of structural disadvantage, and that redlined Pittsburgh neighborhoods show disproportionate uninsured rates, especially among Black residents, and that states with higher minority populations tend to face higher medical debt burdens.

All of these visualizations provide evidence that the legacy of redlining continues to influence who is most vulnerable to medical debt, which reveals that discrimination in healthcare persists even decades after redlining became illegal.


## References

1. *“The Changing Medical Debt Landscape in the United States.”* Urban Institute, 10 July 2024, apps.urban.org/features/medical-debt-over-time/.

2. *“Figure 1 the Residential Security Map of Pittsburgh, Pennsylvania....”* ResearchGate, 2024,www.researchgate.net/figure/The-residential-security-map-of-Pittsburgh-Pennsylvania-Source-Nelson-et-al-2017_fig1_320295023.

3. *“What Is Your State Doing to Affect Access to Individual Market Coverage?”* Commonwealthfund.org, 2025, www.commonwealthfund.org/publications/maps-and-interactives/what-your-state-doing-affect-access-individual-market-coverage. Accessed 7 Dec. 2025.
