fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then(function (magasin) {

    for (let canape of magasin) {

      const productPagePath = "product.html?id="
      const lienCanape = document.createElement("a");
      lienCanape.href =  productPagePath + canape._id;
      document.querySelector("#items").appendChild(lienCanape)
      
      const articleCanape = document.createElement("article")
      lienCanape.appendChild(articleCanape);

      const imgCanape = document.createElement("img")
      imgCanape.src = canape.imageUrl
      imgCanape.classList.add("produit-img")
      articleCanape.appendChild(imgCanape)
      imgCanape.setAttribute("alt", canape.altTxt);
      

      const nameCanape = document.createElement("h3")
      nameCanape.textContent = canape.name
      nameCanape.classList.add("productName")
      articleCanape.appendChild(nameCanape)

      const descriptionCanape = document.createElement("p")
      descriptionCanape.textContent = canape.description
      descriptionCanape.classList.add("productDescription")
      articleCanape.appendChild(descriptionCanape)

    }
  })


