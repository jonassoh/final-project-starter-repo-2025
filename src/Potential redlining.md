---
theme: dashboard
title: potential redlining
toc: false
---

tableau stuff

<div id="tableauVizIncome" 
  style="width: 100%; height: 800px;">
</div> 
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script> 
<script type="module"> 
  const vizUrl = "https://public.tableau.com/views/Dashboard2BarChart-CostsAcrossSegregatedAreas/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
  const viz = new tableau.Viz( document.getElementById("tableauVizIncome"), 
  vizUrl, { hideTabs: true, hideToolbar: false, width: "100%", height: "800px" } ); 
</script>