document.addEventListener("DOMContentLoaded", (e) => {
  showSpinner(); 
  hideSpinner(); 

  const obtenerProducts = (products, catName) => {
      const productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = ''; 
     
      products.forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "pb-5 container";

          productCard.innerHTML = `
          <div class="card mb-4 shadow-sm custom-card cursor-active">
          <div class="card-body d-flex align-items-start">
          <div class="image-container">
             <img class="product-image" src="${product.image}" alt="${product.name}">
          </div>
          <div class="text-container ml-3">
            <h3 class="m-3">${product.name}</h3>
            <p class="card-text">${product.description}</p>
            <p class="card-text precio"><strong>Costo:</strong> ${product.cost} ${product.currency}</p>
            <div class="vendidos-container">
            <p class="card-text"><strong>Vendidos:</strong> ${product.soldCount}</p>
          </div>
          `;
          productsContainer.appendChild(productCard);
      });
      document.querySelector('h2.display-7').textContent = catName;
  };

  getJSONData(PRODUCTS_URL +localStorage.getItem("catID")+ EXT_TYPE)
  .then(result => {
      if (result.status === 'ok') {
          obtenerProducts(result.data.products, result.data.catName); 
      }
  });
});