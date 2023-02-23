const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("orderId");

const commande = document.querySelector("#orderId")
commande.textContent = id 