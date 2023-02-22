
// Script para recuperar ubicación de autobuses en Boston y mostrarlos en timepo real sobre un mapa
//Mapa y acceso a us uso
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kNzQiLCJhIjoiY2xlMjV4dHVwMHF0bDNwbzZmdDhtbW15ZyJ9._XMHFLlOSwY28YmwdBAkyg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.0597700, 42.3584300],
  zoom: 12
});

// Acceso y descarga de información MBTA 
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}
let markers = [];

// Creación de markers por cada autobus en ruta. 
async function Coordenadas(){
    markers.forEach(marker => marker.remove())
    markers = []
const BusesInfo = await getBusLocations();
BusesInfo.forEach(function(bus){
        const marker = new mapboxgl.Marker().setLngLat([bus.attributes.longitude, bus.attributes.latitude]).addTo(map); 
         markers.push(marker);         
    });
// Se recomienda no disminuir el tiempo por debajo de los 15000, para evitar ser "baneados"
    setTimeout(Coordenadas, 5000);
}

