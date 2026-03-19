import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const WBHS = [174.749, -36.777];

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({ source: new OSM() })
  ],
  view: new View({
    center: fromLonLat(WBHS),
    zoom: 12
  })
});

const popup = new Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center',
  stopEvent: false
});
popup.setPosition(fromLonLat(WBHS));
map.addOverlay(popup);

const feature = new Feature({
  geometry: new Point(fromLonLat(WBHS)),
  name: 'Westlake Boys High School'
});

const source = new VectorSource({ features: [feature] });
const layer = new VectorLayer({ source });

layer.setStyle(
  new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'white', width: 2 })
    })
  })
);

map.addLayer(layer);
