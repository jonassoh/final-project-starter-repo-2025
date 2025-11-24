---
theme: dashboard
title: Dashboard for Demographics Analysis
toc: false
---


<div id="tableauViz" 
style="width: 100%; height: 800px;"></div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js">
</script> <script type="module"> 
const vizUrl = "https://public.tableau.com/views/67336DashboardPart1/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
const viz = new tableau.Viz( document.getElementById("tableauViz"), 
vizUrl, { hideTabs: true, hideToolbar: false, width: "100%", height: "800px" } ); </script>

We wanted to have a visualization that enables viewers to straightforwardly compare the average household income for each U.S. state over time, spanning from 2011 to 2023. During the data cleaning process, the years 2020 and 2023 were removed due to inconsistencies and missing values in the dataset. Therefore, this visualization will focus on the remaining years with reliable information from the dataset. This map applies a sequential color palette, which is necessary as household income is a continuous quantitative variable where higher values will indicate higher average income labels. The intensity of the color enables viewers to quickly distinguish between states with relatively low or high income levels for any given year. For clear and efficient interpretation, we have eliminated chart junk by using a clear and simple layout with clearly defined labels. To the right, the year filter on the right enables viewers to explore how income levels can change over time.

