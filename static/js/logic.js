// define url = All earthquakes in the past day
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL/
d3.json(url).then(data => {

    // display geojson data in console
    console.log(data);

    // call the function with the data features
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // function to display place and time of each earthquake
  function onEachFeature(features, layer){
    layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>${new Date(features.properties.time)}</p>`);};

    // Create a GeoJSON layer that contains the features array on the earthquakeData object
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        // point to layer for the circule coordinates
        pointToLayer: function(features, coordinates) {
        let depth = features.properties.mag;
        let geoMarkers = {
            radius: depth * 5,
            fillColor: colors(depth),
            fillOpacity: 0.7,
            weight: 0.5
        };
        return L.circleMarker(coordinates, geoMarkers);
    }
    });

  // call function
  createMap(earthquakes);
};

// color scale
function colors(depth) {

    // variable to hold the color
    let color = "";

    if (depth <= 1) {
        return color = "grey";
    }
    else if (depth <= 2) {
        return color = "pink";
    }
    else if (depth <= 3) {
        return color = "green";
    }
    else if (depth <= 4) {
        return color = "blue";
    }
    else if (depth <= 5) {
        return color = "purple";
    }
    else {
        return color = "red";
    }

};
// function to create the map
function createMap(earthquakes) {
    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // topographic view
    let topo = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{layers: 'TOPO-WMS'});


    // Create a baseMaps object.
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // overlay object for street map and topgraphic map
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create map
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, earthquakes]
    });


};