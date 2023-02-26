// Récupération des produits du panier depuis le stockage local
const panier = JSON.parse(localStorage.getItem("panier"));


// Parcours de tous les produits dans le panier
for (let canape of panier) {
    // Récupération du produit depuis l'API
    fetch("http://localhost:3000/api/products/" + canape.id)
        .then((res) => res.json())
        .then(function (product) {

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
            pquantity.textContent = "Qté : €";

            inputItemQuantity = document.createElement("input")
            cartItemContentSettingQuantity.appendChild(inputItemQuantity)
            inputItemQuantity.type = "number";
            inputItemQuantity.classList.add("itemQuantity");
            inputItemQuantity.name = "itemQuantity";
            inputItemQuantity.min = "1";
            inputItemQuantity.max = "100";
            inputItemQuantity.value = parseInt(canape.quantity);

            // Ajoutez un événement pour écouter les modifications de quantité et mettre à jour le panier
            inputItemQuantity.addEventListener("input", function () {
                const newQuantity = parseInt(inputItemQuantity.value);
                if (newQuantity > 0 && newQuantity <= 100) {
                    canape.quantity = newQuantity;
                    localStorage.setItem("panier", JSON.stringify(panier));
                    window.location.reload();
                } else {
                    inputItemQuantity.value = canape.quantity;
                }
            });

            console.log(panier)

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

// Ajout d'un écouteur d'événement pour le formulaire de commande
const formCanape = document.querySelector(".cart__order__form")
formCanape.addEventListener("submit", function (event) {
    event.preventDefault()
    // Récupération des données du formulaire
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    // Validation des entrées du formulaire
    const regexLetters = /^[a-zA-Z]+$/; // expression régulière pour vérifier que les entrées ne contiennent que des lettres
    const regexEmail = /^\S+@\S+\.\S+$/; // expression régulière pour vérifier le format de l'email

    if (!regexLetters.test(firstName)) {
        firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
        firstNameErrorMsg.textContent = "Veuillez entrer uniquement des lettres pour le prénom";
        
        return;
    }

    if (!regexLetters.test(lastName)) {
        lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
        lastNameErrorMsg.textContent = "Veuillez entrer uniquement des lettres pour le nom.";
        return;
    }

    if (address === "") {
        addressErrorMsg = document.querySelector("#addressErrorMsg")
        addressErrorMsg.textContent = "Veuillez entrer une adresse valide"
        return;
    }

    if (!regexLetters.test(city)) {
        cityErrorMsg = document.querySelector("#cityErrorMsg")
        cityErrorMsg.textContent = "Veuillez entrer uniquement des lettres pour la ville.";
        return;
    }

    if (!regexEmail.test(email)) {
        emailErrorMsg = document.querySelector("#emailErrorMsg")
        emailErrorMsg.textContent = "Veuillez entrer une adresse email valide.";
        return;
    }


    console.log(firstName, lastName, address, city, email)
    console.log(panier.map((produit) => produit.id))

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
            window.location.href = "confirmation.html?orderId=" + order.orderId
        })
})







