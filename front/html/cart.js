




const panier = JSON.parse(localStorage.getItem("panier"));
// const id = panier[0].id;
// console.log(id);

for (let canape of panier) {





    fetch("http://localhost:3000/api/products/" + canape.id)
        .then((res) => res.json())
        .then(function (product) {


            const articleCanape = document.createElement("article")
            document.querySelector("#cart__items").appendChild(articleCanape)
            articleCanape.classList.add("cart__item")
            articleCanape.setAttribute("data-id", canape.id);
            articleCanape.setAttribute("data-color", canape.color);

            const divCartItemImg = document.createElement("div")
            articleCanape.appendChild(divCartItemImg)
            divCartItemImg.classList.add("cart__item__img")

            const imageAchatCanape = document.createElement("img")
            divCartItemImg.appendChild(imageAchatCanape)
            imageAchatCanape.setAttribute("alt", product.altTxt);
            imageAchatCanape.src = product.imageUrl
            imageAchatCanape.classList.add("cart__item__img")

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
    } else {
    inputItemQuantity.value = canape.quantity;
    }
    });
            const cartItemContentSettingDelete = document.createElement("div")
            cartItemContentSetting.appendChild(cartItemContentSettingDelete)
            cartItemContentSettingDelete.classList.add("cart__item__content__settings__delete")

            const pDelete = document.createElement("p")
            cartItemContentSettingDelete.appendChild(pDelete)
            pDelete.classList.add("deleteItem")
            pDelete.textContent = "Supprimer";
            pDelete.addEventListener("click", function () {
                const article = pDelete.closest(".cart__item")
                console.log(article.getAttribute("data-id"));
                const canapeId = article.getAttribute("data-id")
                const canapeColor = article.getAttribute("data-color")
                //panier.find((produitPanier)=>produitPanier.color === canapeColor)
                const canapeIndex = panier.findIndex((produitPanier) => produitPanier.color === canapeColor && produitPanier.id === canapeId)


                console.log(panier)

                panier.splice(canapeIndex, 1);
                console.log(panier);
                localStorage.setItem("panier", JSON.stringify(panier));
                window.location.reload()



            })
        })




}

const formCanape = document.querySelector(".cart__order__form")
formCanape.addEventListener("submit", function (event) {
    event.preventDefault()
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    // Vérifiez si les entrées "firstName", "lastName", "city", et "email" ne contiennent que des lettres
    if (/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(city)) {
        alert("Veuillez entrer uniquement des caractères alphabétiques pour votre nom, votre prénom, votre ville et votre adresse email");
        return;
      }

    console.log(firstName, lastName, address, city, email)
    console.log(panier.map((produit) => produit.id))
    fetch("http://localhost:3000/api/products/order", {
        method: "post",
        headers:{
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
    .then((order)=>{
        window.location.href = "confirmation.html?orderId="+ order.orderId
    })
})







