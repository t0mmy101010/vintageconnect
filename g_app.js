// Initialisation de la carte avec Leaflet
const map = L.map('map').setView([51.5074, -0.1276], 13); // Centre de Londres

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    attribution: '&copy; Stamen Design'
}).addTo(map);

// Liste des boutiques avec coordonnées et descriptions
const boutiques = [
    { name: "Vintage Paradise", location: [51.5098, -0.1301], description: "Un paradis pour les amateurs de vintage." },
    { name: "Retro Corner", location: [51.5108, -0.1411], description: "Sélection de vêtements rétro des années 80." },
    { name: "London Thrift", location: [51.5144, -0.1235], description: "Boutique de friperie avec une ambiance unique." },
    { name: "Oldies But Goldies", location: [51.5192, -0.1158], description: "Collection vintage exclusive." },
    { name: "Vintage Wardrobe", location: [51.5220, -0.1045], description: "Boutique élégante de mode vintage." },
    { name: "Curated Vintage", location: [51.5065, -0.1189], description: "Sélection soignée d'articles vintage." }
];

// Affichage des marqueurs pour chaque boutique
boutiques.forEach(boutique => {
    L.marker(boutique.location)
        .addTo(map)
        .bindPopup(`<b>${boutique.name}</b><br>${boutique.description}`);
});

// Indice de la boutique actuelle
let currentBoutiqueIndex = 0;

// Fonction pour afficher une boutique spécifique
function showBoutique(index) {
    const boutique = boutiques[index];
    
    // Centrer la carte sur la boutique actuelle
    map.setView(boutique.location, 14);

    // Afficher les informations de la boutique
    document.getElementById("info").innerHTML = `<h2>${boutique.name}</h2><p>${boutique.description}</p>`;
}

// Navigation entre les boutiques
document.getElementById("previous").addEventListener("click", () => {
    currentBoutiqueIndex = (currentBoutiqueIndex === 0) ? boutiques.length - 1 : currentBoutiqueIndex - 1;
    showBoutique(currentBoutiqueIndex);
});

document.getElementById("next").addEventListener("click", () => {
    currentBoutiqueIndex = (currentBoutiqueIndex === boutiques.length - 1) ? 0 : currentBoutiqueIndex + 1;
    showBoutique(currentBoutiqueIndex);
});

// Affiche la première boutique au chargement
showBoutique(currentBoutiqueIndex);

// Ajout du module de routage pour afficher l'itinéraire
const routingControl = L.Routing.control({
    waypoints: boutiques.map(b => L.latLng(b.location[0], b.location[1])),
    routeWhileDragging: false,
    showAlternatives: false,
    createMarker: function() { return null; }  // Supprime les marqueurs automatiques sur les waypoints
}).addTo(map);
