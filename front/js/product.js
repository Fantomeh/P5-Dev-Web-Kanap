// On récupère l'ID du produit dans les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// On effectue une requête GET pour récupérer les informations du produit avec l'ID correspondant
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then(function (canape) {

    // Si le produit n'existe pas, supprimez toute la page
    if (!canape._id) {
      document.body.innerHTML = '';
      return;
    }

    // On crée une image pour le produit et on l'ajoute à la page
    const imgCanape = document.createElement("img");
    imgCanape.src = canape.imageUrl;
    const item__img = document.querySelector(".item__img");
    item__img.appendChild(imgCanape);
    imgCanape.setAttribute("alt", canape.altTxt);

    // On affiche le nom, le prix et la description du produit sur la page
    const nameCanape = document.querySelector("#title");
    nameCanape.textContent = canape.name;

    const priceCanape = document.querySelector("#price");
    priceCanape.textContent = canape.price;

    const descriptionCanape = document.querySelector("#description");
    descriptionCanape.textContent = canape.description;

    // On crée un menu déroulant pour les couleurs disponibles du produit et on l'ajoute à la page
    const select = document.querySelector("#colors");
    canape.colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });

    // On récupère le panier depuis le stockage local (s'il existe) et on l'initialise à un tableau vide sinon
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    // On ajoute un gestionnaire d'événements pour le clic sur le bouton "Ajouter au panier"
    const bouton = document.querySelector("#addToCart");
    bouton.addEventListener("click", function () {
      const selectedColor = select.value;
      let selectedQuantity = parseInt(document.querySelector("#quantity").value);

      // On vérifie si une couleur a été sélectionnée
      if (!selectedColor) {
        alert("Veuillez sélectionner une couleur pour votre canapé");
        return;
      }

      // On vérifie si la quantité est valide
      if (selectedQuantity <= 0 || isNaN(selectedQuantity) || selectedQuantity % 1 !== 0) {
        alert("Veuillez saisir une quantité valide en nombre entier pour votre canapé");
        return;
      }

      // On vérifie si le produit est déjà dans le panier
      const existingCanapeIndex = panier.findIndex(
        (canape) => canape.id === id && canape.color === selectedColor
      );

      // Si le produit n'est pas dans le panier, on l'ajoute avec la quantité spécifiée
      if (existingCanapeIndex === -1) {
        // On vérifie si la quantité totale de produits ne dépasse pas 100
        if (selectedQuantity > 100) {
          alert("Vous ne pouvez ajouter plus de 100 canapés.");
          return;
        }

        panier.push({
          id: id,
          color: selectedColor,
          quantity: selectedQuantity,
        });
        alert("Les articles sélectionnés ont été ajoutés au panier avec succès.")
      } else {
        // Sinon (si un canapé avec le même ID et la même couleur existe déjà), incrémentez la quantité

        if (selectedQuantity + panier[existingCanapeIndex].quantity > 100) {
          const calculQuantity = 100 - panier[existingCanapeIndex].quantity
          alert("Désolé, vous ne pouvez ajouter que " + calculQuantity + " articles supplémentaires de ce produit à votre panier.")
          return
        }
        panier[existingCanapeIndex].quantity += selectedQuantity
        alert("Les articles sélectionnés ont été ajoutés au panier avec succès.")
      }
      // On affiche le contenu du panier dans la console et on le sauvegarde dans le stockage local
      console.log(panier);
      localStorage.setItem("panier", JSON.stringify(panier));
    });



  })

