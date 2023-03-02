// Récupération des produits du panier depuis le stockage local
const panier = JSON.parse(localStorage.getItem("panier"));
const products = [] // récupération du product (pour le prix)

// Parcours de tous les produits dans le panier
for (let canape of panier) {
    // Récupération du produit depuis l'API
    fetch("http://localhost:3000/api/products/" + canape.id)
        .then((res) => res.json())
        .then(function (product) {
            product.quantity = canape.quantity// récupérer la quantité du panier 
            products.push(product)

            updateTotalPrice() // Mise à jour du prix total

            // Création de l'élément d'article pour le produit dans le panier
            const articleCanape = document.createElement("article")
            document.querySelector("#cart__items").appendChild(articleCanape)
            articleCanape.classList.add("cart__item")
            articleCanape.setAttribute("data-id", canape.id);
            articleCanape.setAttribute("data-color", canape.color);

            // Ajout de l'image du produit dans le panier
            const divCartItemImg = document.createElement("div")
            articleCanape.appendChild(divCartItemImg)
            divCartItemImg.classList.add("cart__item__img")

            const imageAchatCanape = document.createElement("img")
            divCartItemImg.appendChild(imageAchatCanape)
            imageAchatCanape.setAttribute("alt", product.altTxt);
            imageAchatCanape.src = product.imageUrl
            imageAchatCanape.classList.add("cart__item__img")

            // Ajout du nom, de la couleur et du prix du produit dans le panier
            const cartItemContent = document.createElement("div")
            articleCanape.appendChild(cartItemContent)
            cartItemContent.classList.add("cart__item__content")

            const cartItemContentDescription = document.createElement("div")
            cartItemContent.appendChild(cartItemContentDescription)
            cartItemContentDescription.classList.add("cart__item__content__description")

            const nomCanape = document.createElement("h2")
            nomCanape.textContent = product.name
            cartItemContentDescription.appendChild(nomCanape)

            const couleurCapane = document.createElement("p")
            couleurCapane.textContent = canape.color
            cartItemContentDescription.appendChild(couleurCapane)
            console.log(panier)

            const prixCapane = document.createElement("p")
            prixCapane.textContent = product.price + ("€")
            cartItemContentDescription.appendChild(prixCapane)

            // Ajout de la quantité et de la possibilité de la modifier
            const cartItemContentSetting = document.createElement("div")
            cartItemContent.appendChild(cartItemContentSetting)
            cartItemContentSetting.classList.add("cart__item__content__settings")

            const cartItemContentSettingQuantity = document.createElement("div")
            cartItemContentSetting.appendChild(cartItemContentSettingQuantity)
            cartItemContentSettingQuantity.classList.add("cart__item__content__settings__quantity")

            const pquantity = document.createElement("p")
            cartItemContentSettingQuantity.appendChild(pquantity)
            pquantity.textContent = "Qté :  ";

            const inputItemQuantity = document.createElement("input")
            cartItemContentSettingQuantity.appendChild(inputItemQuantity)
            inputItemQuantity.type = "number";
            inputItemQuantity.classList.add("itemQuantity");
            inputItemQuantity.name = "itemQuantity";
            inputItemQuantity.min = "1";
            inputItemQuantity.max = "100";
            inputItemQuantity.value = parseInt(canape.quantity);

            // Ajout d'un événement pour écouter les modifications de quantité et mettre à jour le panier
            inputItemQuantity.addEventListener("input", function () {
                // Récupération de la nouvelle quantité
                const newQuantity = parseInt(inputItemQuantity.value);
                console.log(newQuantity)
                // Vérification que la nouvelle quantité est valide (entre 1 et 100)
                if (newQuantity > 0 && newQuantity <= 100) {
                    // Mettre à jour la quantité dans le produit dans le panier
                    canape.quantity = newQuantity;
                    product.quantity = newQuantity;
                    // Mettre à jour le panier dans le stockage local
                    localStorage.setItem("panier", JSON.stringify(panier));
                    // Mettre à jour le nombre total d'articles
                    updateTotalQuantity();
                    // Mettre à jour le prix total
                    updateTotalPrice();
                }
            });


            // Ajout de la possibilité de supprimer le produit dans le panier
            const cartItemContentSettingDelete = document.createElement("div")
            cartItemContentSetting.appendChild(cartItemContentSettingDelete)
            cartItemContentSettingDelete.classList.add("cart__item__content__settings__delete")

            const pDelete = document.createElement("p")
            cartItemContentSettingDelete.appendChild(pDelete)
            pDelete.classList.add("deleteItem")
            pDelete.textContent = "Supprimer";
            pDelete.addEventListener("click", function () {
                // Trouver l'article qui doit être supprimé
                const article = pDelete.closest(".cart__item")
                console.log(article.getAttribute("data-id"));
                const canapeId = article.getAttribute("data-id")
                const canapeColor = article.getAttribute("data-color")
                const canapeIndex = panier.findIndex((produitPanier) => produitPanier.color === canapeColor && produitPanier.id === canapeId)

                // Supprimer l'article du panier
                panier.splice(canapeIndex, 1);
                console.log(panier);
                localStorage.setItem("panier", JSON.stringify(panier));
                window.location.reload()

                console.log(panier)
            })
        })
}

// Calcul du nombre total d'articles dans le panier
function updateTotalQuantity() {
    let totalQuantity = 0;
    // Boucle pour ajouter la quantité de chaque produit dans le panier
    for (const canape of panier) {
    totalQuantity += canape.quantity;
    }
    // Mise à jour de l'affichage du nombre total d'articles
    const totalQuantityElement = document.querySelector("#totalQuantity");
    totalQuantityElement.textContent = totalQuantity;
    }
    
    // Appel de la fonction pour mettre à jour l'affichage initial du nombre total d'articles
    updateTotalQuantity();
    
    // Calcul du prix total de la commande
    function updateTotalPrice() {
    let totalPrice = 0;
    // Boucle pour ajouter le prix de chaque produit dans le panier en multipliant par sa quantité
    for (const canape of products) {
    totalPrice += canape.price * canape.quantity;
    }
    // Mise à jour de l'affichage du prix total
    const totalPriceElement = document.querySelector("#totalPrice");
    totalPriceElement.textContent = totalPrice.toFixed(2); //toFixe2 pour arrondir à 2 chiffres après la virgule
    }

// Ajout d'un écouteur d'événement pour le formulaire de commande
const formCanape = document.querySelector(".cart__order__form");
const boutonForm = document.querySelector("#order")
boutonForm.addEventListener("click", function (event) {
    event.preventDefault();

    let validation = true

    // Récupération des données du formulaire
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    // Validation des entrées du formulaire
    const regexLetters = /^[a-zA-Z]+$/; // expression régulière pour vérifier que les entrées ne contiennent que des lettres
    const regexEmail = /^\S+@\S+\.\S+$/; // expression régulière pour vérifier le format de l'email

    // Validation du prénom
    if (!regexLetters.test(firstName)) {
        document.querySelector("#firstNameErrorMsg").textContent = "Veuillez entrer uniquement des lettres pour le prénom.";
        validation = false
    } else {
        document.querySelector("#firstNameErrorMsg").textContent = ""; // Efface le message d'erreur
    }

    // Validation du nom
    if (!regexLetters.test(lastName)) {
        document.querySelector("#lastNameErrorMsg").textContent = "Veuillez entrer uniquement des lettres pour le nom.";
        validation = false
    } else {
        document.querySelector("#lastNameErrorMsg").textContent = ""; // Efface le message d'erreur
    }

    // Validation de l'adresse
    if (address === "") {
        document.querySelector("#addressErrorMsg").textContent = "Veuillez entrer une adresse valide.";
        validation = false
    } else {
        document.querySelector("#addressErrorMsg").textContent = ""; // Efface le message d'erreur
    }

    // Validation de la ville
    if (!regexLetters.test(city)) {
        document.querySelector("#cityErrorMsg").textContent = "Veuillez entrer uniquement des lettres pour la ville.";
        validation = false
    } else {
        document.querySelector("#cityErrorMsg").textContent = ""; // Efface le message d'erreur
    }

    // Validation de l'email
    if (!regexEmail.test(email)) {
        document.querySelector("#emailErrorMsg").textContent = "Veuillez entrer une adresse email valide.";
        validation = false
    } else {
        document.querySelector("#emailErrorMsg").textContent = ""; // Efface le message d'erreur
    }

    if (validation === false) {
        return
    }


    // Envoi de la commande au serveur
    fetch("http://localhost:3000/api/products/order", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contact: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
            },
            products: panier.map((produit) => produit.id)
        })
    })
        .then((res) => res.json())
        .then((order) => {
            // Envoi réussi, redirection vers la page de confirmation
            window.location.href = "confirmation.html?orderId=" + order.orderId
        })
})

