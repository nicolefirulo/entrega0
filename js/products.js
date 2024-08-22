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
           <div class="card-body d-flex align-items-start">
           <div class="image-container">
        <img class="product-image" src="${product.image}" alt="${product.name}">
         </div>
         <div class="text-container ml-3">
           <h3 class="m-3">${product.name}</h3>
           <p class="card-text"><strong>Descripción: </strong>${product.description}</p>
           <p class="card-text"><strong>Costo:</strong> ${product.cost} ${product.currency}</p>
           <div class="vendidos-container">
           <p class="card-text"><strong>Vendidos:</strong> ${product.soldCount}</p>
           </div>
      </div>
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