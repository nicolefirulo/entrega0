const id = localStorage.getItem("productID")
const PRODUCT_URL = PRODUCT_INFO_URL + id + EXT_TYPE;
let productInfo = [];

function showProduct(element) {
    
 let categoryName = `<h1>${element.category}</h1>`
    document.getElementById("categoryName").innerHTML = categoryName;
    let imagesHtml = '';

    for (let i = 0; i < element.images.length; i++) {
        const image = element.images[i];
        imagesHtml += `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${image}" class="d-block w-100">
        </div>`;
    }
    document.getElementById("carousel-inner").innerHTML = imagesHtml;

    let productINFO = '';
    productINFO += `
    <div class="row">
    <h2> ${element.name} </h2>
    <p id="descripcion"> ${element.description} </p>
    <div id="precio-vendidos">
    <div class="precio">
    <p> Costo: ${element.cost} ${element.currency} </p>
    </div>
    <div class="vendidos">
    <p> Vendidos: ${element.soldCount} </p>
    </div>
    </div>
    </div>
    `
    document.getElementById("info").innerHTML = productINFO;
    showRelatedProducts(element.relatedProducts)
}

function showRelatedProducts(array) {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let product = array[i];
      htmlContentToAppend += `
      <div class="col-lg-3 col-md-4 col-6 mb-1">
          <div class="card product-item" data-product-id="${product.id}" style="cursor: pointer;">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
              </div>
          </div>
      </div>`;
  }

  document.getElementById("related-products-container").innerHTML = htmlContentToAppend;
  selectedProduct(); 
}

function selectedProduct() {
  let productItem = document.querySelectorAll(".product-item");
  productItem.forEach(function (product) {
      product.addEventListener("click", function() {
          let idProduct = product.getAttribute("data-product-id");
          console.log("Selected product ID:", idProduct); 
          localStorage.setItem("productID", idProduct);
          window.location.href = "product-info.html";
      });
  });
}

  document.addEventListener("DOMContentLoaded", () => {
  getJSONData(PRODUCT_URL)
        .then(result => {
            if (result.status === 'ok') {
                let productInfo = result.data;
                showProduct(productInfo);
            }
        });
});

// Para cargar comentarios los productos
  const productID = localStorage.getItem("productID"); 
  const commentsURL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE; // Creo URL de comentarios

getJSONData(commentsURL).then(function(result) {
    if (result.status === "ok") {
        let comments = result.data;
        showComments(comments); 
    }
});

function showComments(commentsArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < commentsArray.length; i++) {
        let comment = commentsArray[i];
        let stars = "";
        let vote = comment.score; 
        for (s = 0; s < 5; s++) { //Pinta las estrellas en base al voto
          if (s < vote) {
                stars += `<i class="fa fa-star checked" aria-hidden="true"></i>`
            } else {
                stars += `<i class="fa fa-star-o unchecked" aria-hidden="true"></i>`
            }
        }
        htmlContentToAppend += `
        <div class="comment">
            <strong>${comment.user}</strong> - ${comment.dateTime}
            <div>${stars}</div>
            <p>${comment.description}</p>
        </div>
        `;
    }

    document.getElementById("comments-section").innerHTML = htmlContentToAppend;
}

// Para que aparezcan las estrellas en funcion del valor calificacion 
  document.addEventListener("DOMContentLoaded", function() {
  const stars = document.querySelectorAll("#rating-stars .fa");
  const selectRating = document.getElementById("userRating");
  
//Cambiar estrellas al hacer clic
    stars.forEach(star => {
      star.addEventListener("click", function() {
        const ratingValue = this.getAttribute("data-value");
        selectRating.value = ratingValue;
        updateStars(ratingValue);
      });
    });
  
// Actualizar estrellas según el valor seleccionado
    selectRating.addEventListener("change", function() {
    updateStars(this.value);
});
  
function updateStars(rating) {
      stars.forEach(star => {
      if (parseInt(star.getAttribute("data-value")) <= rating) {
          star.classList.remove("fa-star-o");
          star.classList.add("fa-star");
      } else {
          star.classList.remove("fa-star");
          star.classList.add("fa-star-o");
        }
      });
  }
});

// Función para agregar comentarios y calificaciones nuevas 
function addCommentToDOM(comment) {
  const commentsSection = document.getElementById("comments-section");
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  let stars = "";
  let vote = comment.score; 
  for (s = 0; s < 5; s++) { 
    if (s < vote) {
          stars += `<i class="fa fa-star checked" aria-hidden="true"></i>`
      } else {
          stars += `<i class="fa fa-star-o unchecked" aria-hidden="true"></i>`
      }
  }
  commentDiv.innerHTML = `
      <strong>${comment.user}</strong> - ${comment.dateTime}
      <div>${stars}</div>
      <p>${comment.description}</p>`;
  commentsSection.appendChild(commentDiv);
}

// Función para cargar la calificación y comentario nuevo
function handleRatingSubmit(event) {
  event.preventDefault();

  const userComment = document.getElementById("userComment").value;
  const userRating = document.getElementById("userRating").value;
  const userName = localStorage.getItem("user");

  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const newComment = {
      user: userName,
      dateTime: `${date} ${time}`,
      description: userComment,
      score: parseInt(userRating)
  };

  // Agregar comentario al DOM y localStorage
  addCommentToDOM(newComment);
  saveCommentToLocalStorage(newComment);
}

// Función para cargar comentarios desde localStorage
function loadCommentsFromLocalStorage() {
  try{
  const existingComments = JSON.parse(localStorage.getItem("comments")) || [];
  console.log("Comentarios cargados desde localStorage:", existingComments);

  existingComments.forEach(comment => {
  console.log("Agregando comentario al DOM:", comment);
      addCommentToDOM(comment);
  });
} catch (error) {
  console.error("Error al cargar los comentarios desde localStorage:", error);
}
}
//Funcion para guardar comentarios en localStorage
function saveCommentToLocalStorage(comment){
  try {
  const existingComments = JSON.parse(localStorage.getItem("comments")) || [];
  
  // Agregar el nuevo comentario a la lista
    existingComments.push(comment);
    localStorage.setItem("comments", JSON.stringify(existingComments));
  } catch (error) {

  }
}
  document.getElementById("submitRating").addEventListener("click", handleRatingSubmit);

  document.addEventListener("DOMContentLoaded", () => {
  console.log("Cargando comentarios desde localStorage...");
  loadCommentsFromLocalStorage(); 

});