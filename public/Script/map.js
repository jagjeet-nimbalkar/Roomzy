const coordinates = JSON.parse(mapCoordinates);
const map = new maplibregl.Map({
  container: 'map', 
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`, 
  center: coordinates , 
  zoom: 10,
});

map.addControl(new maplibregl.NavigationControl());


if (Array.isArray(coordinates) && coordinates.length === 2) {
  new maplibregl.Marker({ color: 'red' })
    .setLngLat(coordinates) 
    .addTo(map);
} else {
  console.error('Invalid coordinates:', coordinates);
}

async function geocodeAddress(address) {
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${mapToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Geocoding Response:', data);

    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;
      const [longitude, latitude] = coordinates;

      map.flyTo({ center: [longitude, latitude], zoom: 13 });

      new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      new maplibregl.Popup()
        .setLngLat([longitude, latitude])
        .setHTML(`<h3>${data.features[0].place_name}</h3>`)
        .addTo(map);

      document.querySelector('.valid-feedback').style.display = 'block';
      document.querySelector('.invalid-feedback').style.display = 'none';
    } else {
      document.querySelector('.valid-feedback').style.display = 'none';
      document.querySelector('.invalid-feedback').style.display = 'block';
    }
  } catch (error) {
    console.error('Error geocoding the address:', error);
    document.querySelector('.valid-feedback').style.display = 'none';
    document.querySelector('.invalid-feedback').style.display = 'block';
  }
}

// document.querySelector('form').addEventListener('submit', function(event) {
//   event.preventDefault(); 
//   // const address = document.getElementById("location").value;
//   geocodeAddress(address);
// });
