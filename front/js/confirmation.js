// Récupération de l'ID de la commande à partir des paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("orderId");

// Affichage de l'ID de la commande sur la page
const commande = document.querySelector("#orderId")
commande.textContent = id

