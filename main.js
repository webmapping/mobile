/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    title: "Stephansdom"
};

// Karte initialisieren
let map = L.map("map").setView([
    stephansdom.lat, stephansdom.lng
], 12);

// Hintergrundlayer
let layerControl = L.control.layers({
    "BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay")
}).addTo(map);

// Marker Stephansdom
L.marker([
    stephansdom.lat, stephansdom.lng
]).addTo(map).bindPopup(stephansdom.title).openPopup();

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Geolocation
map.locate({
    setView: true,
    watch: true,
    maxZoom: 16
});

let circle = L.circle([0, 0], 0).addTo(map);
let marker = L.marker([0, 0]).addTo(map);

map.on('locationfound', function (evt) {
    console.log(evt)
    let radius = Math.round(evt.accuracy);

    marker.setLatLng(evt.latlng);
    marker.bindTooltip(`You are within ${radius} meters from this point`).openTooltip();

    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
});

map.on('locationerror', function (evt) {
    console.log(evt)
    alert(evt.message);
});
