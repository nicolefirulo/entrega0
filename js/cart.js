let cart = JSON.parse(localStorage.getItem("carrito"));

function cartProducts() {
    let productCard = document.getElementById("cartProducts");
    productCard.innerHTML = "";
    if (cart === null) {
        productCard.innerHTML += `<div class="row"><p>No hay productos en el carrito.</p></div>`;
    }
    else {
        productCard.innerHTML += `<div class="row"><h5>Nombre</h5><h5>Costo</h5><h5>Cantidad</h5><h5>Subtotal</h5></div><hr>`
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            productCard.innerHTML +=
            `<div class="row">
                <img class="col-2" src=${product.image}>
                <h5 class="col-2">${product.name}</h5>
                <p class="col-2">${product.cost} ${product.currency}</p>
                <div class="col-2 count">
                <button type="button">-</button><p>${product.cantidad}</p><button type="button">+</button> 
                </div>
                <p class="col-2">${product.cost} ${product.currency}</p>
                <hr>
            </div>`
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cartProducts();
});