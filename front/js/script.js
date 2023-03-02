// Fetch les produits à partir de l'API
fetch("http://localhost:3000/api/products/") // envoi une requéte HTTP au SERVEUR 
  .then((res) => res.json()) // Convertir la réponse en JSON
  .then(function (magasin) { //  c'est une fonction anonyme
    //magasin c'est la variable qui va contenir les réponse du serveur 

    // Pour chaque produit dans le magasin
    for (let canape of magasin) {

      // Défini le chemin vers la page du produit
      const productPagePath = "product.html?id=";

      // Créer un lien vers la page du produit
      const lienCanape = document.createElement("a");
      lienCanape.href = productPagePath + canape._id;
      document.querySelector("#items").appendChild(lienCanape);

      // Créer un élément article pour chaque produit
      const articleCanape = document.createElement("article");
      lienCanape.appendChild(articleCanape);

      // Créer une image pour le produit
      const imgCanape = document.createElement("img");
      imgCanape.src = canape.imageUrl;
      imgCanape.classList.add("produit-img");
      articleCanape.appendChild(imgCanape);
      imgCanape.setAttribute("alt", canape.altTxt);


      // Créer un titre pour le produit
      const nameCanape = document.createElement("h3");
      nameCanape.textContent = canape.name;
      nameCanape.classList.add("productName");
      articleCanape.appendChild(nameCanape);

      // Créer une description pour le produit
      const descriptionCanape = document.createElement("p");
      descriptionCanape.textContent = canape.description;
      descriptionCanape.classList.add("productDescription");
      articleCanape.appendChild(descriptionCanape);

    }
  })
