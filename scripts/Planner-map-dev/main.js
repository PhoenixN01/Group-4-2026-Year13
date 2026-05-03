import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const data = {
    locations: {
        "waitangi": {
            name: "Waitangi Treaty Grounds",
            region: "northland",
            coords: [174.08, -35.26],
            categories: ["colonialInteraction", "significantEvents"],
            description: "Historic site where the Treaty of Waitangi was first signed in 1840 between representatives of the British Crown and various Māori chiefs, marking a foundational moment in New Zealand’s history.",
            image: {
                source: "./../static/planner_page/waitangi.png",
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
            description: "Highly sacred site in Māori tradition, regarded as the departure point where spirits of the deceased travel to the ancestral homeland beyond the horizon.",
            image: {
                source: "./../static/planner_page/cape_reinga.png",
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
            description: "Major national museum and war memorial that presents New Zealand’s military history alongside extensive exhibitions on Māori culture, heritage, and taonga (treasures).",
            image: {
                source: "./../static/planner_page/auckland_war_memorial.png",
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
            description: "Significant coastal headland and site of the 1977–1978 occupation protest led by Ngāti Whātua, which became a landmark event in modern Māori land rights activism.",
            image: {
                source: "./../static/planner_page/bastion_point.png",
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
            description: "Fortified pā site and key battleground during the Waikato Wars in 1863, known for its strategic importance and one of the earliest major conflicts of the New Zealand Wars.",
            image: {
                source: "./../static/planner_page/rangiriri.png",
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
            description: "Principal marae of the Māori King Movement (Kīngitanga), serving as a central cultural, political, and ceremonial gathering place for Waikato-Tainui iwi.",
            image: {
                source: "./../static/planner_page/turangawaewae.png",
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
            description: "Cultural and geothermal park combining active geothermal features with Māori arts, carving, and weaving traditions, operating as a major centre for cultural preservation and education.",
            image: {
                source: "./../static/planner_page/te_puia.png",
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
            description: "Historic living Māori village in Rotorua where traditional customs, spiritual practices, and community life continue alongside contemporary daily living.",
            image: {
                source: "./../static/planner_page/ohinemutu.png",
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
            description: "Sacred mountain of deep spiritual significance, associated with the prophet Rua Kēnana and the Ringatū faith, and a symbol of Māori resistance and identity.",
            image: {
                source: "./../static/planner_page/maungapohatu.png",
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
            description: "Important marae in the South Island where the Treaty of Waitangi was signed locally in 1840, representing early agreements between Māori and the Crown in the region.",
            image: {
                source: "./../static/planner_page/maungapohatu.png",
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

// Initialising global variables used for final output
let tripStops = [];
let fullRoute = [];
let totalDistance = 0;
let totalTime = 0;

// Gathering necessary elements from the page 
let filterType = "";
let dropDown = document.getElementById('planner-locationSelect');
let locationList = document.getElementById('planner-tripList');
let previewMain = document.getElementById('planner-previewMain');
let previewTitle = document.getElementById('planner-previewTitle');
let previewImg = document.getElementById('planner-previewImage');
let previewRef = document.getElementById('planner-previewRef');
let previewCC = document.getElementById('planner-previewCC');
let previewDescription = document.getElementById('planner-previewDescription');
let previewPrompt = document.getElementById('planner-previewPrompt');
let previewControls = document.getElementById('planner-previewControls');
let currentPreviewId = null;

// Setting up an optimised searching layout for 
// quick searching by region or category
let regionDict = {};
let categoryDict = {};
let suggestionDict = { regions: regionDict, categories: categoryDict };

// Dictionary to store different map markers
let suggestionMarkers = {};
let tripMarkers = {};

let map;

// Populating the searching Dictionaries
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

// Handling the preview div in all selection states
function suggestionPreview(id = "none") {
    // Default setting
    if (id == "none") {
        previewPrompt.style.display = 'block';
        previewMain.style.display = 'none';
        previewControls.style.display = 'none';
        currentPreviewId = null;
        return;
    }

    const loc = data.locations[id];
    if (!loc) return;

    const buttons = document.querySelectorAll('#planner-mapList button');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeBtn = [...buttons].find(b => b.textContent === data.locations[id].name);
    if (activeBtn) activeBtn.classList.add('active');

    currentPreviewId = id;

    previewPrompt.style.display = 'none';
    previewMain.style.display = 'block';
    previewControls.style.display = 'flex';

    previewTitle.textContent = loc.name;
    previewDescription.textContent = loc.description;

    previewImg.src = loc.image.source;
    previewImg.alt = `${loc.name}: ${loc.image.alt}`;
    previewRef.href = loc.image.ref[0];
    previewRef.textContent = loc.image.ref[1];
    previewCC.href = loc.image.cc[0];
    previewCC.textContent = loc.image.cc[1];
}

// Creating a MapLibre-Gl marker with click / hover functions
function createMarker(id, coords, color, onClick) {
    const marker = new maplibregl.Marker({ color }).setLngLat(coords).addTo(map);
    const markerEl = marker.getElement();

    if (onClick) {
        markerEl.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick(id);
        });
    }

    markerEl.addEventListener('mouseenter', () => {
        markerEl.classList.add('marker-hover');
    });

    markerEl.addEventListener('mouseleave', () => {
        markerEl.classList.remove('marker-hover');
    });

    markerEl.setAttribute('tabindex', '0');
    markerEl.setAttribute('role', 'button');

    markerEl.setAttribute('aria-label', `View location: ${data.locations[id].name}`);

    markerEl.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            markerEl.click();
        }
    });

    return marker;
}

// Clears suggestions markers from map (blue)
function clearSuggestionMarkers() {
    Object.values(suggestionMarkers).forEach(m => m.remove());
    suggestionMarkers = {};
}

// Clears trip markers from map (red)
function clearTripMarkers() {
    Object.values(tripMarkers).forEach(m => m.remove());
    tripMarkers = {};
}

// Click function for suggestion markers (blue)
async function handleSuggestionClick(id) {
    // Checks that trip markers don't replace themselves
    if (tripStops.some(s => s.id === id)) return;

    suggestionMarkers[id]?.remove();
    delete suggestionMarkers[id];

    tripStops.push({ id });
    addTripMarker(id);

    await rebuildRoute();
    renderTripList();
    updateCamera();
}

// Adding trip markers to map (Red)
function addTripMarker(id) {
    const loc = data.locations[id];

    const marker = createMarker(id, loc.coords, 'red', () => {
        const index = tripStops.findIndex(s => s.id === id);
        if (index !== -1) removeStop(index);
    });

    tripMarkers[id] = marker;
}

// Display suggestion markers (blue) based on filter
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
    updateCamera();
}

// Resize map view to ensure markers are visible when filter changes
function fitMapToMarkers(dict) {
    const bounds = new maplibregl.LngLatBounds();

    Object.values(dict).forEach(m => bounds.extend(m.getLngLat()));

    if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 80, duration: 5000 });
    }
}

// Determines corresponding markers for selected filter (blue)
function getRelevantTripMarkers() {
    const filtered = {};

    for (const [id, marker] of Object.entries(tripMarkers)) {
        const loc = data.locations[id];

        if (filterType === "regions") {
            if (loc.region === dropDown.value) {
                filtered[id] = marker;
            }
        }

        if (filterType === "categories") {
            if (loc.categories.includes(dropDown.value)) {
                filtered[id] = marker;
            }
        }
    }

    return filtered;
}

// Calls resize function based on relevant markers (blue)
function updateCamera() {
    const relevantTripMarkers = getRelevantTripMarkers();

    fitMapToMarkers({
        ...suggestionMarkers,
        ...relevantTripMarkers
    });
}

// Feeds filter selection to display suggestion markers (blue)
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

// Updates the trip list upon stop update (add, move, remove)
function renderTripList() {
    locationList.innerHTML = "";

    // iterates through each stop and feeds its designated information into planner.html
    tripStops.forEach((stop, index) => {
        const loc = data.locations[stop.id];

        // Initiate new list item
        const li = document.createElement('li');
        li.classList.add("list-group-item", "d-flex", "justify-content-between");
        li.id = `planner-${stop.id}-tripItem`;

        // Stop name
        const span = document.createElement('span');
        span.textContent = loc.name;
        span.classList.add("item-text");
        span.id = `planner-${stop.id}-tripName`;

        // Travel Estimations
        const meta = document.createElement('small');
        meta.classList.add("text-muted-dark", "d-block");
        meta.style.lineHeight = "1.2";

        let distanceText = "";
        let timeText = "";

        // Processing travel time and distances
        if (stop.distanceKm !== undefined && stop.distanceKm !== null) {
            distanceText = stop.distanceKm.toFixed(1) + " km";
        }

        if (stop.travelTimeMin !== undefined && stop.travelTimeMin !== null) {
            timeText = stop.travelTimeMin + " min";
        }

        if (distanceText !== "" && timeText !== "") {
            meta.textContent = distanceText + " • " + timeText;
        } else if (distanceText !== "") {
            meta.textContent = distanceText;
        } else if (timeText !== "") {
            meta.textContent = timeText;
        } else {
            meta.textContent = "";
        }

        // Div for control buttons
        const btnDiv = document.createElement('div');
        btnDiv.classList.add("btn-group", "btn-group-sm", "ms-auto");

        // Remove button (x)
        const remove = document.createElement('button');
        remove.textContent = "✕";
        remove.classList.add("btn", "btn-outline-danger");
        remove.onclick = () => removeStop(index);
        remove.id = `planner-${stop.id}-removeButton`;
        remove.setAttribute('aria-label', `Remove ${loc.name} from trip`);

        // Up button (↑)
        const up = document.createElement('button');
        up.textContent = "↑";
        up.classList.add("btn", "btn-outline-secondary");
        up.onclick = () => moveStop(index, -1);
        up.id = `planner-${stop.id}-upButton`;
        up.setAttribute('aria-label', `Move ${loc.name} up`);

        // Down button (↓)
        const down = document.createElement('button');
        down.textContent = "↓";
        down.classList.add("btn", "btn-outline-secondary")
        down.onclick = () => moveStop(index, 1);
        down.id = `planner-${stop.id}-downButton`;
        down.setAttribute('aria-label', `Move ${loc.name} down`);

        // Div for title and travel est.
        const wrapper = document.createElement('div');
        wrapper.classList.add("d-flex", "flex-column", "align-items-start");

        wrapper.append(span, meta);

        btnDiv.append(up, down, remove)
        li.append(wrapper, btnDiv);
        locationList.appendChild(li);
    });
    console.log(tripStops);
}

// Removing a stop from trip
async function removeStop(index) {
    const removed = tripStops.splice(index, 1)[0];
    tripMarkers[removed.id]?.remove();
    delete tripMarkers[removed.id];

    showSuggestions();
    await rebuildRoute();
    renderTripList();
}

// Reordering a trip stop
async function moveStop(index, dir) {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= tripStops.length) return;

    [tripStops[index], tripStops[newIndex]] = [tripStops[newIndex], tripStops[index]];

    await rebuildRoute();
    renderTripList();
}

// Fetching segment information between 2 stops from OSRM
async function getRoute(start, end) {
    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const json = await res.json();

    return json.routes[0];
}

// Remaking full route with each update (add, move, remove)
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
    
    // Iterate through each stop pair (A->B, B->C, etc.)
    for (let i = 0; i < tripStops.length - 1; i++) {
        const start = data.locations[tripStops[i].id].coords;
        const end = data.locations[tripStops[i + 1].id].coords;

        routePromises.push(
            getRoute(start, end)
        );
    }

    const segments = await Promise.all(routePromises);

    tripStops.forEach(stop => {
        stop.distanceKm = 0;
        stop.travelTimeMin = 0;
    });

    const coords = [];

    // Handle travel est. per segment
    segments.forEach((seg, i) => {
        const startStop = tripStops[i];

        startStop.distanceKm = seg.distance / 1000;
        startStop.travelTimeMin = Math.round(seg.duration / 60);

        const segmentCoords = seg.geometry.coordinates;

        if (i === 0) {
            coords.push(...segmentCoords);
        } else {
            coords.push(...segmentCoords.slice(1));
        }

        totalDistance += seg.distance;
        totalTime += seg.duration;
    });

    // Push full route onto map layer
    source.setData({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coords
        }
    });
}

// Format google maps query upon export
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

// Execute google maps export 
function exportToGoogleMaps() {
    if (tripStops.length === 0) return;

    const url = buildGoogleMapsUrl();

    showExportModal(url);
}

// Send trip url to html and open export window
function showExportModal(url) {
    const modalEl = document.getElementById('planner-exportModal');

    const linkBtn = document.getElementById('planner-exportGoBtn');
    linkBtn.href = url;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

// Populate filter dropdown
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

// Populate accessibility marker list
function renderAccessibleList() {
    const list = document.getElementById('planner-mapList');
    list.innerHTML = "";

    Object.entries(data.locations).forEach(([id, loc]) => {
        const li = document.createElement('li');

        const btn = document.createElement('button');
        btn.textContent = loc.name;
        btn.classList.add("btn", "btn-outline-secondary");

        // Accessibility
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-describedby', `desc-${id}`);

        // Marker click simulation
        btn.onclick = () => {
            map.flyTo({
                center: loc.coords,
                zoom: 10
            });

            suggestionPreview(id);
        };

        // Keyboard support
        btn.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                btn.click();
            }
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// Handle accessibility panel events
function setupAccessiblePanel() {
    const panel = document.getElementById('planner-mapListPanel');
    const openBtn = document.getElementById('planner-openList');
    const closeBtn = document.getElementById('planner-closeList');

    openBtn.onclick = () => {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        openBtn.setAttribute('aria-expanded', 'true');

        closeBtn.focus();
    };

    closeBtn.onclick = () => {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        openBtn.setAttribute('aria-expanded', 'false');

        openBtn.focus();
    };
}

// Handle Screen Reader Focusing
function trapFocus(panel) {
    const focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    panel.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.key === 'Escape') {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            document.getElementById('planner-openList').focus();
        }

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

// Handle all ui setup as well as functionality
function setupUI() {
    let regionOption = document.getElementById('planner-regionOption');
    let categoryOption = document.getElementById('planner-categoryOption');

    regionOption.onclick = () => {
        categoryOption.classList.remove('active');
        categoryOption.setAttribute("aria-pressed", "false");
        regionOption.classList.add('active');
        regionOption.setAttribute("aria-pressed", "true");

        dropDownOptions("regions");
    };

    categoryOption.onclick = () => {
        regionOption.classList.remove('active');
        regionOption.setAttribute("aria-pressed", "false");
        categoryOption.classList.add('active');
        categoryOption.setAttribute("aria-pressed", "true");

        dropDownOptions("categories");
    };
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

// Initiate map using maptiler design
map = new maplibregl.Map({
    container: 'planner-map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=Nh1VoYoYkD3jnoS91PIq',
    center: [174.76, -33.85],
    zoom: 3
});

// Initiate map on page load
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
    renderAccessibleList();
    setupAccessiblePanel();
    trapFocus(document.getElementById('planner-mapListPanel'));
});

// Custom map settings (camera pitch, max view window)
map.setPitch(30);
let bounds = [
    [154.23211799401287, -51.971820916688266],
    [186.81582372033893, -31.961208260269977]
];
map.setMaxBounds(bounds);