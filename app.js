require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/config",
    "esri/widgets/BasemapGallery", // Import BasemapGallery
    "esri/widgets/Search",          // Import Search
    "esri/widgets/Zoom"             // Import Zoom
], (Map, MapView, Graphic, GraphicsLayer, esriConfig, BasemapGallery, Search, Zoom) => {

    esriConfig.apiKey = "AAPK863f9c192ece44c89d9a07f0a0289cccMjwQbd_TYMr5jClmBG_d4uNsPf2A3aaC98XHky_GDJBF77wlWmIvUsx2GzD068NX";

    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    const view = new MapView({
        container: "map",
        map: map,
        center: [2.3522, 48.8566],
        zoom: 5,
        ui: {
            components: [] // Masque tous les contrôles de l'interface utilisateur, y compris les crédits
        }
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const boutiques = [
        {id:1, name: "Vintage Glam", address: "123 Rue de la Mode, Paris", rating: 4.5, event: "Atelier Styling", description: "Vêtements vintage.", coords: [2.3522, 48.8566], category: "sustainable" ,  images: ["1.webp", "image2.jpg", "image3.jpg"]},
        { id:2,name: "Retro Chic", address: "78 Fashion Rd, London", rating: 4.0, description: "Antiquités et mobilier.", coords: [-0.1276, 51.5074], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { id:3,name: "Berlin Trend", address: "22 Hauptstraße, Berlin", rating: 4.2, description: "Accessoires vintage.", coords: [13.405, 52.52], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { id:4,name: "Madrid Style", address: "56 Calle de la Moda, Madrid", rating: 3.9, event: "Pop-up marché", description: "Mode espagnole.", coords: [-3.7038, 40.4168], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { id:5,name: "Milan Class", address: "Via della Moda 45, Milan", rating: 4.6, description: "Mode italienne.", coords: [9.19, 45.4642], category: "sustainable",  images: ["./electronic1.webp", "electronic2.webp", "electronic3.webp"] },
        { id:6,name: "Amsterdam Vintage", address: "Nieuwendijk 123, Amsterdam", rating: 4.3, description: "Boutique rétro.", coords: [4.9041, 52.3676], category: "sustainable",  images: ["electronic4.webp", "electronic1.webp", "electronic2.webp"] },
        { name: "Barcelona Trends", address: "Carrer de la Moda 78, Barcelona", rating: 4.1, description: "Styles catalans.", coords: [2.1734, 41.3851], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Vienna Chic", address: "Stephansplatz 12, Vienna", rating: 4.4, description: "Accessoires élégants.", coords: [16.3738, 48.2082], category: "sustainable",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Prague Elegance", address: "Národní 7, Prague", rating: 4.2, description: "Mode bohémienne.", coords: [14.4378, 50.0755], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Lisbon Essence", address: "Rua da Moda, Lisbon", rating: 4.0, description: "Styles portugais.", coords: [-9.1393, 38.7223], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Brussels Retro", address: "Rue des Boutiques 10, Brussels", rating: 3.9, description: "Styles belges.", coords: [4.3517, 50.8503], category: "sustainable",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Warsaw Trend", address: "ul. Mody 20, Warsaw", rating: 4.1, description: "Mode polonaise.", coords: [21.0122, 52.2297], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"]},
        { name: "Budapest Chic", address: "Fashion Ave 15, Budapest", rating: 4.3, description: "Élégance hongroise.", coords: [19.0402, 47.4979], category: "events",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Stockholm Style", address: "Stora gatan 23, Stockholm", rating: 4.2, description: "Mode suédoise.", coords: [18.0686, 59.3293], category: "sustainable",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Copenhagen Cool", address: "Nyhavn 9, Copenhagen", rating: 4.4, description: "Mode danoise.", coords: [12.5683, 55.6761], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Helsinki Retro", address: "Mannerheimintie 12, Helsinki", rating: 4.5, description: "Style finlandais.", coords: [24.9384, 60.1699], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Dublin Fashion", address: "O'Connell St 34, Dublin", rating: 3.8, description: "Mode irlandaise.", coords: [-6.2603, 53.3498], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Oslo Originals", address: "Karl Johans gate 9, Oslo", rating: 4.1, description: "Styles norvégiens.", coords: [10.7522, 59.9139], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Zurich Elegance", address: "Bahnhofstrasse 20, Zurich", rating: 4.2, description: "Chic suisse.", coords: [8.5417, 47.3769], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] },
        { name: "Athens Trends", address: "Ermou 15, Athens", rating: 4.3, description: "Styles grecs.", coords: [23.7275, 37.9838], category: "local",  images: ["image1.jpg", "image2.jpg", "image3.jpg"] }
    ];

    let filtersActive = true; // Par défaut, les filtres sont activés

    // Fonction pour générer des étoiles colorées en fonction de la note
    function generateStars(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? `<span class="star filled">&#9733;</span>` : `<span class="star">&#9734;</span>`;
        }
        return stars;
    }
//

    // Fonction pour ajouter une boutique sur la carte
    function addBoutiqueToMap(boutique) {
        const point = {
            type: "point",
            longitude: boutique.coords[0],
            latitude: boutique.coords[1]
        };
    
        const pointGraphic = new Graphic({
            geometry: point,
            symbol: { 
                type: "simple-marker", 
                color: "blue", 
                outline: { color: "white", width: 1 } 
            }
        });
    
        graphicsLayer.add(pointGraphic);
    
        // Ajout d'un événement pour ouvrir un pop-up au clic sur le point
        view.on("click", (event) => {
            view.hitTest(event).then((response) => {
                const graphic = response.results.find(result => result.graphic === pointGraphic);
                if (graphic) {
                    view.popup.open({
                        title: boutique.name,
                        content: `
                            <p><strong>Description :</strong> ${boutique.description}</p>
                            <p><strong>Adresse :</strong> ${boutique.address}</p>
                            <p>${generateStars(boutique.rating)}</p>
                            ${boutique.event ? `<p><strong>Événement :</strong> ${boutique.event}</p>` : ""}
                            <button class="btn btn-primary mt-2" onclick="showDetails('${boutique.name}')">En savoir plus</button>
                        `,
                        location: graphic.geometry, // Position du pop-up
                        alignment: "top-left" // Place le pop-up à côté du point
                    });
                }
            });
        });
    }
    

    // Fonction pour gérer l'activation/désactivation des filtres
    window.toggleFilters = () => {
        filtersActive = !filtersActive;
        document.getElementById('toggleFilters').textContent = filtersActive ? "Désactiver les Filtres" : "Activer les Filtres";
        graphicsLayer.removeAll();
        if (!filtersActive) {
            boutiques.forEach(boutique => addBoutiqueToMap(boutique)); // Affiche toutes les boutiques
        }
    };
//
//ajouter plus de details et les masquer
window.showDetails = (boutiqueName) => {
    const boutique = boutiques.find(b => b.name === boutiqueName);
    const detailsSection = document.getElementById("boutique-details");

    if (boutique && boutique.id) { // Vérifiez que la boutique et son ID existent
        // Récupérer les avis associés à la boutique via son ID sous forme de chaîne de caractères
        const boutiqueReviews = reviews[boutique.id.toString()] || [];
        
        // Générer le HTML pour les avis
        const reviewsHtml = boutiqueReviews.map(review => `
            <div class="review">
                <p><strong>${review.clientName}:</strong> ${review.comment}</p>
                <p>Note: ${generateStars(review.rating)}</p>
            </div>
        `).join('');

        // Remplir la section des détails de la boutique avec les informations et les avis
        detailsSection.querySelector(".popup-content").innerHTML = `
            <h5>${boutique.name}</h5>
            <p><strong>Description :</strong> ${boutique.description}</p>
            <p><strong>Adresse :</strong> ${boutique.address}</p>
            <p>${generateStars(boutique.rating)}</p>
            ${boutique.event ? `<p><strong>Événement :</strong> ${boutique.event}</p>` : ""}
            <div class="image-gallery">
                ${boutique.images.map(img => `<img src="${img}" alt="${boutique.name}" class="boutique-image">`).join('')}
            </div>
            <h6>Avis des clients :</h6>
            ${reviewsHtml.length > 0 ? reviewsHtml : "<p>Aucun avis pour cette boutique.</p>"}
        `;

        detailsSection.style.display = "block";
    } else {
        console.error(`Boutique "${boutiqueName}" non trouvée ou sans ID valide.`);
        detailsSection.querySelector(".popup-content").innerHTML = `
            <p>Erreur: La boutique demandée est introuvable.</p>
        `;
        detailsSection.style.display = "block";
    }
};

// Fonction pour générer les étoiles en fonction de la note
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}


  
 


// Fonction pour cacher les détails
window.hideDetails = () => {
    const detailsSection = document.getElementById("boutique-details");
    detailsSection.style.display = "none";
};


window.zoomTo = (longitude, latitude) => {
    view.goTo({ center: [longitude, latitude], zoom: 14 }); // Modifiez le zoom selon vos préférences
};
    // Fonction pour filtrer les boutiques par catégorie
    window.filterBy = (category) => {
        view.goTo({zoom: 4 }); 
        const btn1=document.getElementById("Clothing and Accessories")
        const btn2=document.getElementById("Electronics")
        const btn3=document.getElementById("Art & Posters")
        if(category=="local"){
            btn1.classList.add("active")
            btn2.classList.remove("active")
            btn3.classList.remove("active")

        }
        if(category=="sustainable"){
            btn1.classList.remove("active")
            btn2.classList.add("active")
            btn3.classList.remove("active")

        }
        if(category=="events"){
            btn1.classList.remove("active")
            btn2.classList.remove("active")
            btn3.classList.add("active")

        }

        if (!filtersActive) return; // N'applique aucun filtre si les filtres sont désactivés
        graphicsLayer.removeAll();
        boutiques.filter(b => b.category === category).forEach(boutique => addBoutiqueToMap(boutique));
    };

    // Affichage des boutiques dans la liste HTML avec étoiles
    const boutiquesList = document.querySelector('#boutiques-list .list-group');
    boutiques.forEach(boutique => {
        const boutiqueItem = document.createElement('div');
        boutiqueItem.classList.add('list-group-item');
        boutiqueItem.innerHTML = `
            <h5>${boutique.name}</h5>
            <p><strong>Adresse :</strong> ${boutique.address}</p>
            <p>${generateStars(boutique.rating)}</p>
            ${boutique.event ? `<p><strong>Événement :</strong> ${boutique.event}</p>` : ""}
            <button class="btn btn-primary mt-2" onclick="showDetails('${boutique.name}')">En savoir plus</button>
            <button class="btn btn-secondary mt-2 ms-2" onclick="zoomTo(${boutique.coords[0]}, ${boutique.coords[1]})">Voir sur carte</button>
        `;
        boutiquesList.appendChild(boutiqueItem);
    });
    

    // Fonction pour centrer la carte sur une boutique spécifique
    window.zoomTo = (longitude, latitude) => {
        view.goTo({
            center: [longitude, latitude],
            zoom: 14
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Fonction d'inscription pour un événement
    window.registerForEvent = (boutiqueName) => {
        alert(`Vous êtes maintenant inscrit à l'événement de ${boutiqueName}!`);
    };
    function displayAllBoutiques() {
        boutiques.forEach(boutique => {
            addBoutiqueToMap(boutique);
        });
    }

    // Appel pour afficher toutes les boutiques par défaut
    displayAllBoutiques();
    
});

function filter () {
    let filters = document.getElementById("filter-options");
    filters.classList.contains("hidden")?filters.classList.remove("hidden"):filters.classList.add("hidden")
}

