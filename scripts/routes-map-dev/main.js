import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
  center: [175.7167, -38.4000], // North Island
  zoom: 5,
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
});

const routeCoords = {
    landMarch: [
        [172.7975, -34.5046], // Te Hāpua
        [174.7767, -41.2784] // Parliament
    ],
    auckland: [
        [174.76454, -36.87806], // Mount Eden
        [174.77778, -36.86028], // Auckland Museum
        [174.8242, -36.8464] // Bastion Point
    ],

    northLand: [
        [174.0807225, -35.2677559], // Waitangi Treaty Grounds
        [174.12222, -35.26167], // Kororāreka, Russell
        [172.6794, -34.4296], // Cape Reinga, Te Rerenga Wairua
    ],

    rotorua: [
        [178.31011700, -38.05454072], // Te Puia 
        [176.311134, -38.245265], // Te Pā Tū
        [176.25643062487825, -38.161168940910066] // Whakarewarewa
    ],

    waikatoWar: [
        [175.13, -37.43], // Rangiriri Pā
        [175.3378, -38.0494], // Ōrākau NZ Wars memorial
        [176.14, -37.72] // Gate Pā Historic Reserve
    ],

    southIsland: [
        [172.632377, -43.526945], // Christchurch
        [172.9461869, -43.8353764], // Ōnuku Marae 
        [171.2562, -44.3971] // Te Ana Māori Rock Art Centre
    ]
};

let markers = [];

    async function loadRoute(routeCoords) {

        if (map.getLayer('route-line')) map.removeLayer('route-line');
        if (map.getSource('route')) map.removeSource('route');

        markers.forEach(m => m.remove());
        markers = [];

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
            const color = i === 0 ? 'green' : 'red';
            const marker = new maplibregl.Marker({ color })
                .setLngLat(coord)
                .addTo(map);

            markers.push(marker);
        });

        const bounds = routeCoords.reduce(
            (b, coord) => b.extend(coord),
            new maplibregl.LngLatBounds(routeCoords[0], routeCoords[0])
        );

        map.fitBounds(bounds, { padding: 50 });
    }

    const modal = document.getElementById('exampleModal');

    modal.addEventListener('shown.bs.modal', (event) => {

        const button = event.relatedTarget;
        const routeKey = button.getAttribute('data-route');

        loadRoute(routeCoords[routeKey]);

        map.resize();
    });

map.setPitch(30);
map.setBearing(0);