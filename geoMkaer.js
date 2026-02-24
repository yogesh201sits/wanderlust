async function getGeometry(place) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(place)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MyApp/1.0 (myemail@example.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No results found");
    }

    const best = data[0];
    const lat = parseFloat(best.lat);
    const lon = parseFloat(best.lon);

    return {
      type: "Point",
      coordinates: [lon, lat] // GeoJSON order is [lon, lat]
    };

  } catch (err) {
    console.error("Geocoding error:", err.message);
    return null; // or throw again if you want the caller to handle
  }
}

// Example usage
(async () => {
  const geometry = await getGeometry("Pune");
  if (geometry) {
    console.log(geometry);
  }
})();
