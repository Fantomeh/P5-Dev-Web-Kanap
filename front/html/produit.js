//const url = window.location.href;
//const id = url.split("id=")[1];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then(function (canape) {

   
    if (!canape._id) {
      // (il faut ajouté se produit exite pas ) 
      return
    }

    const imgCanape = document.createElement("img");
    imgCanape.src = canape.imageUrl;
    const item__img = document.querySelector(".item__img");
    item__img.appendChild(imgCanape);
    imgCanape.setAttribute("alt", canape.altTxt);

    const nameCanape = document.querySelector("#title");
    nameCanape.textContent = canape.name;

    const priceCanape = document.querySelector("#price");
    priceCanape.textContent = canape.price;

    const descriptionCanape = document.querySelector("#description");
    descriptionCanape.textContent = canape.description;


    const select = document.querySelector("#colors"); // On sélectionne l'élément HTML qui a l'ID "colors" (qui devrait être un élément "select")

    canape.colors.forEach(color => { // Pour chaque couleur dans le tableau "colors" du produit "canape"
      const option = document.createElement("option"); // On crée un nouvel élément HTML "option"
      option.value = color; // On donne à l'élément "option" la valeur de la couleur actuelle
      option.textContent = color; // On donne à l'élément "option" le texte de la couleur actuelle
      select.appendChild(option); // On ajoute l'élément "option" à l'élément "select"
    });





    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    const bouton = document.querySelector("#addToCart");

    bouton.addEventListener("click", function () {
      const selectedColor = select.value;
      let selectedQuantity = parseInt(document.querySelector("#quantity").value )





      // Vérifiez si une couleur a été sélectionnée
      if (!selectedColor) {
        alert("Veuillez sélectionner une couleur pour votre canapé");
        return;
      }

      // Vérifiez si la quantité est supérieure à 0 et si c'est un nombre entier
      if (selectedQuantity <= 0 || isNaN(selectedQuantity) || selectedQuantity % 1 !== 0) {
        alert("Veuillez saisir une quantité valide en nombre entier pour votre canapé");
        return;
      }

      // Vérifiez si un canapé avec le même ID et la même couleur existe déjà dans le panier
      const existingCanapeIndex = panier.findIndex(
        (canape) => canape.id === id && canape.color === selectedColor
      );

  

      if(existingCanapeIndex === -1){
        // Si le canapé n'existe pas déjà dans le panier, ajoutez un nouvel objet pour ce canapé dans le panier
        if(selectedQuantity > 100 ){
          alert(`Vous ne pouvez ajouter plus de 100 canapés.`);
          return
        }

        panier.push({
          id: id,
          color: selectedColor,
          quantity: selectedQuantity,
        });
      } else {
        // Sinon (si un canapé avec le même ID et la même couleur existe déjà), incrémentez la quantité

        if( selectedQuantity + panier[existingCanapeIndex].quantity > 100){
          const calculQuantity = 100 - panier[existingCanapeIndex].quantity
          alert("texte"+calculQuantity + "texte")
          return
        }
        panier[existingCanapeIndex].quantity += selectedQuantity
      }

      console.log(panier);
      localStorage.setItem("panier", JSON.stringify(panier));
    });



  })






