// map class initialize 
var map = L.map('map').setView([20.5937, 78.9629], 4);
map.zoomControl.setPosition('topright');

// adding osm tilelayer 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

//  var st = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
//    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     subdomains: 'abcd',
//    minZoom: 0,
//    maxZoom: 20,
//    ext: 'png'
//  });

//Addming marker in the center of map
// var singleMarker = L.marker([38.8610, 71.2761])
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

//add map scale
L.control.scale().addTo(map);

//Map coordinate display
map.on('mousemove', function (e) {
    $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})


//Geojson load
// var marker = L.markerClusterGroup();
// var taji = L.geoJSON(data, {
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(feature.properties.name)
//     }
// });
// taji.addTo(marker);
// marker.addTo(map);

// //geoserver
// var geoServerLayer = L.tileLayer.wms('http://localhost:8085/geoserver/webapp/wms', {
//             layers: 'webapp:India_State_Boundary',
//             transparent: true,
//             attribution: '@geoserver',
//             ratio:1,
//             serverType:'geoserver'

//         }).addTo(map);

var geoServerIPPort='localhost:8085';
var geoServerWorkspace='webapp';
var stateLayerName='webapp:AP NEW DISTRICTS';
var dem="webapp:n17_e083_3arc_v2";
var eq="webapp:earthquake1";
var India="webapp:India_State_Boundary";
var Indiarail="webapp:IND_rails";

var IndiarailLayer=L.tileLayer.wms("http://"+geoServerIPPort+"/geoserver/"+geoServerWorkspace+"/wms",
{
    layers:Indiarail ,
    format:"image/png",
    transparent : "true",
    version :"1.1.0",
    tiles:true,})

var IndiaLayer=L.tileLayer.wms("http://"+geoServerIPPort+"/geoserver/"+geoServerWorkspace+"/wms",
{
    layers:India ,
    format:"image/png",
    transparent : "true",
    version :"1.1.0",
    tiles:true,})

var StateLayer=L.tileLayer.wms("http://"+geoServerIPPort+"/geoserver/"+geoServerWorkspace+"/wms",
{
    layers:stateLayerName ,
    format:"image/png",
    transparent : "true",
    version :"1.1.0",
    tiles:true,})

var demLayer=L.tileLayer.wms("http://"+geoServerIPPort+"/geoserver/"+geoServerWorkspace+"/wms",
    {
        layers:dem ,
        format:"image/png",
        transparent : "true",
        version :"1.1.0",
        tiles:true,})

var earth=L.tileLayer.wms("http://"+geoServerIPPort+"/geoserver/"+geoServerWorkspace+"/wms",
        {
            layers:eq,
            format:"image/png",
            transparent : "true",
            version :"1.1.0",
            tiles:true,})
//Leaflet layer control
var baseMaps = {
    'OSM': osm,
    'Water Color Map': watercolorMap,
    // 'Stamen Toner': st
}

var overlayMaps = {
    // 'GeoJSON Markers': marker,
    // 'Single Marker': singleMarker,
    'Andhra Pradesh':StateLayer,
    'DEM Layer':demLayer,
     'Earthquake data':earth,
     'India States':IndiaLayer,
     'India Rails':IndiarailLayer
}
L.control.layers(baseMaps,overlayMaps,{position:'topleft'}).addTo(map);
