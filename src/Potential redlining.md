---
theme: dashboard
title: potential redlining
toc: false
---

# Potential Health Insurance Redlining

text

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

<!-- This is for the Scatterplot -->
<div id="tableauViz" 
style="width: 100%; height: 800px;"></div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js">
</script> <script type="module"> 
const vizUrl = "https://public.tableau.com/views/ScatterplotforTermProject/Sheet1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
const viz = new tableau.Viz( document.getElementById("tableauViz"), 
vizUrl, { hideTabs: true, hideToolbar: false, width: "92%", height: "800px" } ); 
</script>

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

## Process of Designing the Dashboard

text

## Design Rationale

text

## Tool(s)

text

## Connecting __ to Systemic Healthcare Issues

text

## References