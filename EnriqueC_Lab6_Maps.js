//Enrique Coronado

var map = L.map('map').setView([39.5, -98.35], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
function generateRandomUSCoordinates() {
    let lat = getRandomInRange(30, 35, 3);
    let lon = getRandomInRange(-90, -100, 3);
    return [lat, lon];
}

let [lat1, lon1] = generateRandomUSCoordinates();
let [lat2, lon2] = generateRandomUSCoordinates();
let [lat3, lon3] = generateRandomUSCoordinates();

let marker1 = L.marker([lat1, lon1]).addTo(map);
let marker2 = L.marker([lat2, lon2]).addTo(map);
let marker3 = L.marker([lat3, lon3]).addTo(map);

document.getElementById("marker1").innerText = `Marker 1: Latitude:${lat1}, Longitude:${lon1}`;
document.getElementById("marker2").innerText = `Marker 2: Latitude:${lat2}, Longitude:${lon2}`;
document.getElementById("marker3").innerText = `Marker 3: Latitude:${lat3}, Longitude:${lon3}`;

function getLocality(lat, lon, elementId) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
        document.getElementById(elementId).innerText = `Locality: ${data.locality || 'Not available'}`;
    })
    .catch(error => {
        console.error('Error fetching locality:', error);
        document.getElementById(elementId).innerText = 'Locality: Error fetching data';
    });
}

getLocality(lat1, lon1, "locality1");
getLocality(lat2, lon2, "locality2");
getLocality(lat3, lon3, "locality3");
