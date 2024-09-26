const id = localStorage.getItem("productID")
const PRODUCT_URL = PRODUCT_INFO_URL + id + EXT_TYPE;
let productInfo = [];
function showProduct(array) {
    
    let categoryName = `<a href="products.html"> ${array.category}</a>  &gt`
    document.getElementById("categoryName").innerHTML = categoryName;

    let imagesHtml = '';

    for (let i = 0; i < array.images.length; i++) {
        const image = array.images[i];
        console.log("Image URL:", image);
        imagesHtml += `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${image}" class="d-block w-100">
        </div>`;
    }
    document.getElementById("carousel-inner").innerHTML = imagesHtml;

    let productINFO = '';
    productINFO += `
    <div class="categoryName">
    <h1> ${array.category} </h1>
    </div>
    <h2> ${array.name} </h2>
    <p> ${array.description} </p>
    <div class="precio">
    <p> Costo: ${array.cost} ${array.currency} </p>
    </div>
    <div class="vendidos">
    <p> Vendidos: ${array.soldCount} </p>
    </div>
    `
    document.getElementById("info").innerHTML = productINFO;
}
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCT_URL)
        .then(result => {
            if (result.status === 'ok') {
                let productInfo = result.data;
                showProduct(productInfo);
                console.log(productInfo);
            }
        });
});

// Para cargar comentarios los produ
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

        htmlContentToAppend += `
        <div class="comment">
            <strong>${comment.user}</strong> - ${comment.dateTime}
            <p>Puntuación: ${comment.score} / 5</p>
            <p>${comment.description}</p>
        </div>
        <hr>
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

// Función para cargar comentarios y calificación nueva
function handleRatingSubmit(event) {
  event.preventDefault(); 

  const userComment = document.getElementById("userComment").value;
  const userRating = document.getElementById("userRating").value;
  const userName = localStorage.getItem("user"); 

  const now = new Date();
  const date = now.toISOString().split('T')[0];  
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' , second: '2-digit' });

  const newComment = {
      user: userName,
      dateTime: `${date} ${time}`,
      description: userComment,
      score: parseInt(userRating)
  };

  addCommentToDOM(newComment);
  document.getElementById("ratingForm").reset();
}

function addCommentToDOM(comment) {
  const commentsSection = document.getElementById("comments-section");
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.innerHTML = `
      <strong>${comment.user}</strong> - ${comment.dateTime}
      <p>Puntuación: ${comment.score} / 5</p>
      <p>${comment.description}</p>
      <hr>`;
  commentsSection.appendChild(commentDiv);
}

document.addEventListener("DOMContentLoaded", function() {
  const stars = document.querySelectorAll("#rating-stars .fa");
  const selectRating = document.getElementById("userRating");

  stars.forEach(star => {
      star.addEventListener("click", function() {
          const ratingValue = this.getAttribute("data-value");
          selectRating.value = ratingValue;
          updateStars(ratingValue);
      });
  });

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

  document.getElementById("submitRating").addEventListener("click", handleRatingSubmit);
});
