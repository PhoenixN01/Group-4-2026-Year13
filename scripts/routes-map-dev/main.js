import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
  center: [175.7167, -38.4000], // North Island
  zoom: 12,
  pitch: 0,
  bearing: 0
});

map.addControl(new maplibregl.NavigationControl());

map.on('load', async () => {
    map.addLayer({
        id: '3d-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 12,
        paint: {
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-opacity': 1
        }
    });

    const routeCoords = [
        [172.7975, -34.5046],
        [174.7767, -41.2784]
    ];

    const coordString = routeCoords.map(c => `${c[0]},${c[1]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

    const res = await fetch(url);   
    const data = await res.json();
    const geometry = data.routes[0].geometry;

    map.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', geometry }
    });

    map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: { 
            'line-color': '#007AFF', 
            'line-width': 4
        }
    });

    routeCoords.forEach((coord, i) => {
        let color;
        if (i === 0) {
            color = 'green';
        } else {
            color = 'red';
        }
        new maplibregl.Marker({ color }).setLngLat(coord).addTo(map);
    });
});

map.setPitch(45);
map.setBearing(20);