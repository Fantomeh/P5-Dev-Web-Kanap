fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then(function (magasin) {

    for (canape of magasin) {

      const articleCanape = document.createElement("article")
      document.querySelector(".produit").appendChild(articleCanape)

      const imgCanape = document.createElement("img")
      imgCanape.src =  canape.imageUrl
      imgCanape.classList.add("produit-img")
      articleCanape.appendChild(imgCanape)

      const nameCanape = document.createElement("h3")
      nameCanape.textContent = canape.name
      articleCanape.appendChild(nameCanape)

      const descriptionCanape = document.createElement("p")
      descriptionCanape.textContent = canape.description
      articleCanape.appendChild(descriptionCanape)

    }
  })

