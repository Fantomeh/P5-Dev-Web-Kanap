fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then(function (magasin) {

        for (canape of magasin) {

            const panier = JSON.parse(localStorage.getItem("panier"));

            //const testPanier = document.createElement("p");
            //testPanier.textContent = JSON.stringify(panier);
            //document.querySelector("#cart__items").appendChild(testPanier);

            const articleCanape = document.createElement("article");
            articleCanape.classList.add("cart__item");
            articleCanape.setAttribute("data-id", "{product-ID}");
            articleCanape.setAttribute("data-color", "{product-color}");

        }
    })
