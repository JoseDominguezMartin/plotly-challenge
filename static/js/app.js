function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then((data) => {

    // Use d3 to select the panel with id of `#sample-metadata`
    let meta_id = d3.select("#sample-metadata");
    // sample_metadata.forEach((sample) => {
      // console.log(sample);

      // Use `.html("") to clear any existing metadata
      meta_id.html("");

      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key, value]) => {
        // console.log(key, value);
        meta_id.append('tr').text(`${key}: ${value}`);
      });
    });
    }
            
  function buildCharts(sample) {

        // @TODO: Use `d3.json` to fetch the sample data for the plots
        d3.json(`/samples/${sample}`).then((data) => {
          let otu_ids = data.otu_ids.slice(0,10);
          let otu_labels = data.otu_labels.slice(0,10);
          let sample_values = data.sample_values.slice(0,10);
          // @TODO: Build a Bubble Chart using the sample data
          let bubble_id = d3.select("#bubble");

          let layout1 = {
            height: 600,
            width: 800
          };

          let bubble_data = [{
              x: otu_ids,
              y: sample_values,
              type: "scatter",
              mode: 'markers',
              marker: {
                size: sample_values,
                color: otu_ids,
                cmin: 0,
                cmax: 50}
                }]

            

          Plotly.plot("bubble", bubble_data, layout1);

          console.log(data)
          // @TODO: Build a Pie Chart
          // HINT: You will need to use slice() to grab the top 10 sample_values,
          // data.slice(0, 11);
          // otu_ids, and labels (10 each).----SC note: Sliced on app.py before data variable created
          let pie_id = d3.select("#pie");
          // OR let pieChart = document.querySelector('#pie');
          d3.json(`/samples/${sample}`).then((data) => {
            let otu_ids = data.otu_ids.slice(0,10);
            let otu_labels = data.otu_labels.slice(0,10);
            let sample_values = data.sample_values.slice(0,10);
            let layout = {
              title: "Belly button",
              height: 600,
              width: 800
            }
            
            let pie_data = [{
              "labels": otu_ids,
              "values": sample_values,
              "hover_text": otu_labels,
              "type": "pie"}]

        
            Plotly.plot("pie", pie_data, layout);
          });
        
      });
  }
    
    

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);

  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  
