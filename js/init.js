const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function login_check() {

  let email = localStorage.getItem("email")

  if (localStorage.getItem("email") == null ){
  window.location.href = "login.html";
   } else {
    document.getElementById("emailButton").innerHTML = email
   }

   document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("email"); 
    window.location.href = "login.html"; 
});

}

login_check();

 // Lógica de modo oscuro
 const btnSwitch = document.querySelector('#switch');

 // Cargar preferencia de modo oscuro desde localStorage
 if (localStorage.getItem('dark-mode') === 'true') {
     document.body.classList.add('dark');
     btnSwitch.classList.add('active');
 }

 btnSwitch.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     btnSwitch.classList.toggle('active');

     // Guardar el estado del modo oscuro en localStorage
     if (document.body.classList.contains('dark')) {
         localStorage.setItem('dark-mode', 'true');
     } else {
         localStorage.setItem('dark-mode', 'false');
     }
 });