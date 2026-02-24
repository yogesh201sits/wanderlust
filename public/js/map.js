console.log(cordinates)


const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const leafletCoords = [cordinates[1], cordinates[0]];

const map = L.map('map').setView(leafletCoords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker(leafletCoords,{ icon: redIcon }).addTo(map);
marker.bindPopup(`<b>Hello!</b><br>This is your location.`);

map.on('click', function(e) {
  alert('You clicked at ' + e.latlng.toString());
});
