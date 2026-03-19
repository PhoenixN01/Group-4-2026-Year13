import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
  center: [174.76, -36.85], // Auckland
  zoom: 12,
  pitch: 0,
  bearing: 0
});

map.addControl(new maplibregl.NavigationControl());

map.on('load', () => {
    map.addLayer({
        id: '3d-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
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

map.setPitch(45);
map.setBearing(20);