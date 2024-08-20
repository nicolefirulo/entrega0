document.addEventListener("DOMContentLoaded", function() {
    const requestURL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    const request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
  
    request.onload = function() {
      const listaAutos = request.response;
  
      if (listaAutos && listaAutos.products) {
        const productsContainer = document.getElementById("products-container");
        
        listaAutos.products.forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "pb-5 container";
  
          productCard.innerHTML = `
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${product.image}" alt="${product.name}">
              <div class="card-body">
                <h3 class="m-3">${product.name}</h3>
                <p class="card-text"><strong>Descripción:</strong>${product.description}</p>
                <p class="card-text"><strong>Costo:</strong> ${product.cost} ${product.currency}</p>
                <p class="card-text"><strong>Vendidos:</strong> ${product.soldCount}</p>
              </div>
            </div>
          `;
  
          productsContainer.appendChild(productCard);
        });
  
        document.getElementById('spinner-wrapper').style.display = 'none';
      } else {
        console.error('No hay productos');
      }
    };
  });