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