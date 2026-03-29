import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const routeCoords = {
    landMarch: [
        [172.7975, -34.5046], // Te Hāpua
        [172.97, -34.65], // Te Kao
        [173.2637, -35.1149], // Kaitaia
        [173.55, -35.21667], // Mangamuka
        [174.00022750, -35.39764301], // Otiria
        [174.3606, -35.6208], // Hikurangi
        [174.44, -35.98], // Waipu
        [174.5236, -36.2946], // Wellsford
        [174.76, -36.85], // Auckland
        [175.1271, -37.6782], // Ngaruawahia
        [175.35, -38.04], // Kihikihi
        [175.167, -38.333], // Te Kūiti
        [175.25, -38.88], // Taumarunui
        [175.28, -39.43], // Raetihi
        [175.0701, -39.8941], // Whanganui
        [175.1771, -40.0412], // Rātana
        [175.6117, -40.3550], // Palmerston North
        [175.140, -40.753], // Ōtaki
        [174.85, -41.14], // Porirua
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
        [176.2508968, -38.1631954], // Te Puia 
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

let map;
let currentMarkers = [];

async function openModalMap(containerId, coords) {
    if (map) map.remove(); // Clear old map to prevent memory leaks

    map = new maplibregl.Map({
        container: containerId,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
        center: [175.7167, -38.4000],
        zoom: 5,
        pitch: 45,
        bearing: 20
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

        const coordString = coords.map(c => `${c[0]},${c[1]}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

        try {
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
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#007AFF', 'line-width': 4 }
            });

            const bounds = new maplibregl.LngLatBounds();
            coords.forEach((coord, i) => {
                const color = (i === 0) ? 'green' : 'red';
                const marker = new maplibregl.Marker({ color })
                    .setLngLat(coord)
                    .addTo(map);
                
                currentMarkers.push(marker);
                bounds.extend(coord);
            });

            map.fitBounds(bounds, { padding: 80, duration: 1500 });

        } catch (error) {
            console.error("OSRM Routing failed:", error);
        }
    });
}

document.querySelectorAll('button[data-route]').forEach(btn => {
    const modalId = btn.getAttribute('data-bs-target');
    const modalEl = document.querySelector(modalId);

    modalEl.addEventListener('shown.bs.modal', () => {
        const routeKey = btn.getAttribute('data-route');
        const containerId = `${modalEl.id}-map`;
        openModalMap(containerId, routeCoords[routeKey]);
    });
});