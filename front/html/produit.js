const url = window.location.href;
const id = url.split("id=")[1];

fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then(function (canape) {

        if (!canape) return;

        const imgCanape = document.createElement("img");
        imgCanape.src = canape.imageUrl;
        const item__img = document.querySelector(".item__img");
        item__img.appendChild(imgCanape);

        const nameCanape = document.querySelector("#title");
        nameCanape.innerText = canape.name;

        const priceCanape = document.querySelector("#price");
        priceCanape.innerText = canape.price;

        const descriptionCanape = document.querySelector("#description");
        descriptionCanape.innerText = canape.description;


        const select = document.querySelector("#colors"); // On sélectionne l'élément HTML qui a l'ID "colors" (qui devrait être un élément "select")

        canape.colors.forEach(color => { // Pour chaque couleur dans le tableau "colors" du produit "canape"
            const option = document.createElement("option"); // On crée un nouvel élément HTML "option"
            option.value = color; // On donne à l'élément "option" la valeur de la couleur actuelle
            option.innerText = color; // On donne à l'élément "option" le texte de la couleur actuelle
            select.appendChild(option); // On ajoute l'élément "option" à l'élément "select"
        });

      



const panier = []

const bouton = document.querySelector("#addToCart")

bouton.addEventListener("click", function () {
    const selectedColor = select.value;
    panier.push({
    id: id,
    color: selectedColor,
    quantity: document.querySelector("#quantity").value,
    });
    console.log(panier);
    localStorage.setItem("panier", JSON.stringify(panier));
    });



})


    //sauvegardé le panier en mémoir grace a localstorage 
    //trouvé comment transformé le panier en text 




