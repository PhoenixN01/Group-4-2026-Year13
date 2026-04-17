import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let tripStops = [];
let fullRoute = [];
let totalDistance = 0;
let totalTime = 0;

async function getRoute(start, end) {
    const coordString = `${start[0]},${start[1]};${end[0]},${end[1]}`;
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

    const res = await fetch(url);   
    const data = await res.json();

    console.log(data);
    return data.routes[0];
};

async function updateTrip() {
    const n = tripStops.length;

    if (n < 2) return;

    const start = tripStops[n - 2].coords;
    const end = tripStops[n - 1].coords;

    const segment = await getRoute(start, end);

    fullRoute.push(...segment.geometry.coordinates);
    totalDistance += segment.distance;
    totalTime += segment.duration;

    map.getSource('route').setData({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: fullRoute
        }
    });
    console.log(`${totalDistance} Metres`);
    console.log(`${totalTime} Seconds`);
};

function exportToGoogleMaps() {
    const waypoints = tripStops.map(t => `${t.coords[1]},${t.coords[0]}`);

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const midpoints = waypoints.slice(1, -1).join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${midpoints ? `&waypoints=${midpoints}` : ''}&travelmode=driving`;

    console.log(url);
};

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
  center: [174.76, -36.85], // Auckland
  zoom: 12,
  pitch: 0,
  bearing: 0,
  boxZoom: true
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

    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        }
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

    map.on('click', async (e) => {
        const coords = [e.lngLat.lng, e.lngLat.lat];

        tripStops.push({ coords });
        exportToGoogleMaps();
        new maplibregl.Marker({ color: '#FF0000' }).setLngLat(coords).addTo(map);
        console.log(`Added marker at: ${e.lngLat}`)
        await updateTrip();
    });
});

map.setPitch(45);
map.setBearing(20);