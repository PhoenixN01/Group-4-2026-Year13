import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const data = {
    locations: {
        "waitangi": {
            name: "Waitangi Treaty Grounds",
            region: "northland",
            coords: [174.08, -35.26],
            categories: ["colonialInteraction", "significantEvents"],
            description: "Site where the Treaty of Waitangi was signed in 1840.",
            image: {
                source: "./static/planner/waitangi.png",
                alt: "Māori Waka at Waitangi",
                ref: ["https://commons.wikimedia.org/wiki/File:Maori_Waka_at_Waitangi.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/publicdomain/zero/1.0/deed.en", "CC 1.0"]
            }
        },
        "cape_reinga": {
            name: "Cape Reinga",
            region: "northland",
            coords: [172.67, -34.43],
            categories: ["spiritualSignificance"],
            description: "Sacred place where Māori believe spirits depart for the afterlife.",
            image: {
                source: "./static/planner/cape_reinga.png",
                alt: "Lighthouse at Cape Reinga",
                ref: ["https://commons.wikimedia.org/wiki/File:Cape_Reinga._NZ_%2820196786676%29.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/publicdomain/zero/1.0/deed.en", "CC 1.0"]
            }
        },
        "auckland_war_memorial": {
            name: "Auckland War Memorial Museum",
            region: "auckland",
            coords: [174.78, -36.86],
            categories: ["modernMāoriCulture", "significantEvents"],
            description: "Museum showcasing Māori culture and New Zealand history.",
            image: {
                source: "./static/planner/auckland_war_memorial.png",
                alt: "Auckland War Memorial Museum",
                ref: ["https://commons.wikimedia.org/wiki/File:Auckland_War_Memorial_Museum_in_2021_%28cropped_square%29.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by/2.0/deed.en", "CC 2.0"]
            }
        },
        "bastion_point": {
            name: "Bastion Point",
            region: "auckland",
            coords: [174.84, -36.85],
            categories: ["colonialInteraction", "modernMāoriCulture"],
            description: "Site of the 1977–78 Ngāti Whātua occupation protest.",
            image: {
                source: "./static/planner/bastion_point.png",
                alt: "Eternal Flame Memorial in New Zealand",
                ref: ["https://commons.wikimedia.org/wiki/File:Eternal_Flame_Memorial_Near_Aukland-New_Zealand-1994.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by-sa/4.0/deed.en", "CC 4.0"]
            }
        },
        "rangiriri": {
            name: "Rangiriri Pā",
            region: "waikato",
            coords: [175.13, -37.43],
            categories: ["significantEvents", "colonialInteraction"],
            description: "Major site of a battle during the Waikato Wars.",
            image: {
                source: "./static/planner/rangiriri.png",
                alt: "Rangiriri Trenches",
                ref: ["https://commons.wikimedia.org/wiki/File:Rangiriri_trenches.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/publicdomain/zero/1.0/deed.en", "CC 1.0"]
            }
        },
        "turangawaewae": {
            name: "Tūrangawaewae Marae",
            region: "waikato",
            coords: [175.15, -37.55],
            categories: ["modernMāoriCulture"],
            description: "Principal marae of the Māori King Movement.",
            image: {
                source: "./static/planner/turangawaewae.png",
                alt: "Mahinarangi House",
                ref: ["https://commons.wikimedia.org/wiki/File:MahinarangiHouse.JPG", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by-sa/3.0/deed.en", "CC 3.0"]
            }
        },
        "te_puia": {
            name: "Te Puia",
            region: "centralNorthIsland",
            coords: [176.25, -38.14],
            categories: ["geothermal", "modernMāoriCulture"],
            description: "Cultural centre featuring Māori arts and geothermal activity.",
            image: {
                source: "./static/planner/te_puia.png",
                alt: "Te Puia Springs",
                ref: ["https://commons.wikimedia.org/wiki/File:Te_Puia_Springs.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by-sa/4.0/deed.en", "CC 4.0"]
            }
        },
        "ohinemutu": {
            name: "Ōhinemutu Village",
            region: "centralNorthIsland",
            coords: [176.25, -38.13],
            categories: ["livingCulture", "spiritualSignificance"],
            description: "Living Māori village in Rotorua with strong cultural traditions.",
            image: {
                source: "./static/planner/ohinemutu.png",
                alt: "St Faiths Anglican Church",
                ref: ["https://commons.wikimedia.org/wiki/File:St_Faiths_Anglican_Church,_Ohinemutu,_Rotorua_%282%29.JPG", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by-sa/3.0/deed.en", "CC 3.0"]
            }
        },
        "maungapohatu": {
            name: "Maungapōhatu",
            region: "centralNorthIsland",
            coords: [177.15, -38.63],
            categories: ["spiritualSignificance", "significantEvents"],
            description: "Sacred mountain and site connected to Rua Kēnana.",
            image: {
                source: "./static/planner/maungapohatu.png",
                alt: "Waikaremoana, Urewera, New Zealand",
                ref: ["https://commons.wikimedia.org/wiki/File:Lake_Waikaremoana,_Urewera,_New_Zealand,_13th._Dec_2010_-_Flickr_-_PhillipC.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by/2.0/deed.en", "CC 2.0"]
            }
        },
        "onuku_marae": {
            name: "Ōnuku Marae",
            region: "southIsland",
            coords: [172.97, -43.75],
            categories: ["colonialInteraction", "significantEvents"],
            description: "Location where the Treaty of Waitangi was signed in the South Island.",
            image: {
                source: "./static/planner/maungapohatu.png",
                alt: "Onuku - Noho Marae",
                ref: ["https://commons.wikimedia.org/wiki/File:Onuku_-_Noho_Marae_%281%29.jpg", "Wikimedia Commons"],
                cc: ["https://creativecommons.org/licenses/by-sa/4.0/deed.en", "CC 4.0"]
            }
        }
    },
    regions: {
        northland: { name: "Northland", coords: [173.9321, -35.4136] },
        auckland: { name: "Auckland", coords: [174.7644, -36.8484] },
        waikato: { name: "Waikato", coords: [175.0233, -37.6191] },
        centralNorthIsland: { name: "Central North Island", coords: [175.7336, -39.0415] },
        southIsland: { name: "South Island", coords: [169.8926, -45.1527] }
    },
    categories: {
        colonialInteraction: { name: "Colonial Interaction" },
        significantEvents: { name: "Significant Events" },
        spiritualSignificance: { name: "Spiritual Significance" },
        modernMāoriCulture: { name: "Modern Māori Culture" },
        livingCulture: { name: "Living Culture" },
        geothermal: { name: "Geothermal" }
    }
};

let tripStops = [];
let fullRoute = [];
let totalDistance = 0;
let totalTime = 0;

let filterType = "";
let dropDown = document.getElementById('planner-locationSelect');
let locationList = document.getElementById('planner-tripList');
let previewMain = document.querySelectorAll('.planner-previewMain');
let previewTitle = document.getElementById('planner-previewTitle');
let previewImg = document.getElementById('planner-previewImage');
let previewRef = document.getElementById('planner-previewRef');
let previewCC = document.getElementById('planner-previewCC');
let previewDescription = document.getElementById('planner-previewDescription');
let previewPrompt = document.getElementById('planner-previewPrompt');
let currentPreviewId = null;

let regionDict = {};
let categoryDict = {};
let suggestionDict = { regions: regionDict, categories: categoryDict };

let suggestionMarkers = {};
let tripMarkers = {};

let map;

function initiateLookup() {
    for (const key in data.regions) regionDict[key] = [];
    for (const key in data.categories) categoryDict[key] = [];

    for (const key in data.locations) {
        const loc = data.locations[key];

        regionDict[loc.region].push(key);

        for (const c of loc.categories) {
            categoryDict[c].push(key);
        }
    }
}
initiateLookup();

function suggestionPreview(id = "none") {
    if (id == "none") {
        previewPrompt.style.display = "block";
        previewMain.forEach(div => div.style.display = 'none');
        currentPreviewId = null;
        return;
    }

    const loc = data.locations[id];
    if (!loc) return;

    currentPreviewId = id;

    previewPrompt.style.display = 'none';
    previewMain.forEach(div => div.style.display = 'block');

    previewTitle.textContent = loc.name;
    previewDescription.textContent = loc.description;

    previewImg.src = loc.image.source;
    previewImg.alt = loc.image.alt;
    previewRef.href = loc.image.ref[0];
    previewRef.textContent = loc.image.ref[1];
    previewCC.href = loc.image.cc[0];
    previewCC.textContent = loc.image.cc[1];
}

function createMarker(id, coords, color, onClick) {
    const marker = new maplibregl.Marker({ color }).setLngLat(coords).addTo(map);

    if (onClick) {
        marker.getElement().addEventListener('click', (e) => {
            e.stopPropagation();
            onClick(id);
        });
    }

    return marker;
}

function clearSuggestionMarkers() {
    Object.values(suggestionMarkers).forEach(m => m.remove());
    suggestionMarkers = {};
}

function clearTripMarkers() {
    Object.values(tripMarkers).forEach(m => m.remove());
    tripMarkers = {};
}

function handleSuggestionClick(id) {
    if (tripStops.some(s => s.id === id)) return;

    suggestionMarkers[id]?.remove();
    delete suggestionMarkers[id];

    tripStops.push({ id });
    addTripMarker(id);

    rebuildRoute();
    renderTripList();
}

function addTripMarker(id) {
    const loc = data.locations[id];

    const marker = createMarker(id, loc.coords, 'red', () => {
        const index = tripStops.findIndex(s => s.id === id);
        if (index !== -1) removeStop(index);
    });

    tripMarkers[id] = marker;
}

function showSuggestions() {
    const list = suggestionDict[filterType]?.[dropDown.value];
    if (!list) return;

    clearSuggestionMarkers();

    list.forEach(id => {
        const loc = data.locations[id];
        if (!loc) return;

        if (tripStops.some(s => s.id === id)) return;

        const marker = createMarker(id, loc.coords, 'blue', (id) => {
            suggestionPreview(id);
        });
        suggestionMarkers[id] = marker;
        console.log(marker.getElement());
    });
    console.log(suggestionMarkers);
    fitMapToMarkers(suggestionMarkers);
}

function fitMapToMarkers(dict) {
    const bounds = new maplibregl.LngLatBounds();

    Object.values(dict).forEach(m => bounds.extend(m.getLngLat()));

    if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 80, duration: 5000 });
    }
}

function handleFilterSelection() {
    const selected = dropDown.value;

    if (filterType === "regions") {
        map.flyTo({
            center: data.regions[selected].coords,
            zoom: 8,
            duration: 8000
        });
    }

    showSuggestions();
}

function renderTripList() {
    locationList.innerHTML = "";

    tripStops.forEach((stop, index) => {
        const loc = data.locations[stop.id];
        const li = document.createElement('li');
        li.textContent = loc.name;
        li.id = `planner-${stop.id}-tripItem`;

        const remove = document.createElement('button');
        remove.textContent = "✕";
        remove.onclick = () => removeStop(index);
        remove.id = `planner-${stop.id}-removeButton`;

        const up = document.createElement('button');
        up.textContent = "↑";
        up.onclick = () => moveStop(index, -1);
        up.id = `planner-${stop.id}-upButton`;

        const down = document.createElement('button');
        down.textContent = "↓";
        down.onclick = () => moveStop(index, 1);
        down.id = `planner-${stop.id}-downButton`;

        li.append(up, down, remove);
        locationList.appendChild(li);
    });
    console.log(tripStops);
}

function removeStop(index) {
    const removed = tripStops.splice(index, 1)[0];
    tripMarkers[removed.id]?.remove();
    delete tripMarkers[removed.id];

    showSuggestions();
    rebuildRoute();
    renderTripList();
}

function moveStop(index, dir) {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= tripStops.length) return;

    [tripStops[index], tripStops[newIndex]] = [tripStops[newIndex], tripStops[index]];

    rebuildRoute();
    renderTripList();
}

async function getRoute(start, end) {
    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const json = await res.json();

    return json.routes[0];
}

async function rebuildRoute() {
    totalDistance = 0;
    totalTime = 0;

    const source = map.getSource('route');

    if (tripStops.length < 2) {
        source.setData({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        });
        return;
    }

    const routePromises = [];

    for (let i = 0; i < tripStops.length - 1; i++) {
        const start = data.locations[tripStops[i].id].coords;
        const end = data.locations[tripStops[i + 1].id].coords;

        routePromises.push(
            getRoute(start, end)
        );
    }

    const segments = await Promise.all(routePromises);

    const coords = [];

    segments.forEach((seg, i) => {
        const segmentCoords = seg.geometry.coordinates;

        if (i === 0) {
            coords.push(...segmentCoords);
        } else {
            coords.push(...segmentCoords.slice(1));
        }

        totalDistance += seg.distance;
        totalTime += seg.duration;
    });

    source.setData({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coords
        }
    });
}

function buildGoogleMapsUrl() {
    const waypoints = tripStops.map(t => {
        const loc = data.locations[t.id];
        return `${loc.coords[1]},${loc.coords[0]}`;
    });

    const origin = waypoints[0];
    const dest = waypoints.at(-1);
    const mid = waypoints.slice(1, -1).join('|');

    return (
        `https://www.google.com/maps/dir/?api=1&origin=${origin}`
         + `&destination=${dest}`
          + (mid ? `&waypoints=${mid}` : '')
           + `&travelmode=driving`
    );
}

function exportToGoogleMaps() {
    if (tripStops.length === 0) return;

    const url = buildGoogleMapsUrl();

    showExportModal(url);
}

function showExportModal(url) {
    const modalEl = document.getElementById('planner-exportModal');

    const linkBtn = document.getElementById('planner-exportGoBtn');
    linkBtn.href = url;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

function dropDownOptions(filter) {
    filterType = filter;

    dropDown.innerHTML = "";

    Object.entries(data[filter]).forEach(([id, val]) => {
        const opt = document.createElement('option');
        opt.value = id;
        opt.textContent = val.name;
        dropDown.appendChild(opt);
    });

    dropDown.style.display = "inline-block";
    dropDown.selectedIndex = 0;

    handleFilterSelection();
}

function setupUI() {
    document.getElementById('planner-regionOption').onclick = () => dropDownOptions("regions");
    document.getElementById('planner-categoryOption').onclick = () => dropDownOptions("categories");
    dropDown.onchange = handleFilterSelection;

    document.getElementById('planner-previewExit').onclick = () => {
        suggestionPreview();
    };
    document.getElementById('planner-addToTrip').onclick = () => {
        if (!currentPreviewId) return;

        handleSuggestionClick(currentPreviewId);
        suggestionPreview();
    };
    document.getElementById('planner-tripExport').onclick = exportToGoogleMaps;
}

map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
    center: [174.76, -36.85],
    zoom: 12
});

map.on('load', () => {

    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: [] }
        }
    });

    map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#007AFF', 'line-width': 4 }
    });

    setupUI();
});

map.setPitch(30);