fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then(function (magasin) {

    for (canape of magasin) {

      const articleCanape = document.createElement("article")
      document.querySelector("#items").appendChild(articleCanape)

      const imgCanape = document.createElement("img")
      imgCanape.src = canape.imageUrl
      imgCanape.classList.add("produit-img")
      articleCanape.appendChild(imgCanape)

      const idcanape = "http://127.0.0.1:5500/front/html/product.html?id="
      const lienCanape = document.createElement("a");
      lienCanape.href =  idcanape + canape._id;
      lienCanape.appendChild(imgCanape);
      articleCanape.appendChild(lienCanape);
      

      const nameCanape = document.createElement("h3")
      nameCanape.textContent = canape.name
      articleCanape.appendChild(nameCanape)

      const descriptionCanape = document.createElement("p")
      descriptionCanape.textContent = canape.description
      articleCanape.appendChild(descriptionCanape)

    }
  })


