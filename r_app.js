function submitReview() {
    // Récupérer les valeurs du formulaire
    const boutiqueSelect = document.getElementById('boutiqueSelect').value; // ID du select de la boutique
    const clientName = document.getElementById('exampleInputEmail1').value; // ID de l'input pour le nom du client
    const clientEmail = document.getElementById('exampleInputEmail1').value; // ID de l'input email
    const clientComment = document.getElementById('comments').value; // ID du textarea pour les commentaires
    const clientRating = document.getElementById('rating').value; // Récupérer la valeur de l'évaluation

    // Vérifiez que la boutique est sélectionnée
    if (boutiqueSelect) {
        console.log(reviews)
        // Créer un nouvel avis
        const newReview = {
            clientName: clientName, // Nom du client
            comment: clientComment,
            rating: parseInt(clientRating) // Convertir la valeur de l'évaluation en entier
        };
        console.log(newReview)
        // Ajouter l'avis à l'objet reviews
        const boutiqueId = parseInt(boutiqueSelect); // Assurez-vous que l'ID de la boutique est un entier
        if (!reviews[boutiqueId]) {
            reviews[boutiqueId] = []; // Initialiser un tableau s'il n'existe pas
        }
        reviews[boutiqueId].push(newReview); // Ajouter le nouvel avis

        // Mettre à jour l'affichage des avis
        // Réinitialiser le formulaire
        document.querySelector('form').reset();
    } else {
        console.error('Erreur: Aucune boutique sélectionnée.');
    }
}
