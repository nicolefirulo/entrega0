let cart = JSON.parse(localStorage.getItem("carrito"));
//Función para mostrar los productos a comprar almacenados en localStorage
function cartProducts() {
    let productCard = document.getElementById("cartProducts");
    productCard.innerHTML = "";
    if (cart === null) {
        productCard.innerHTML += `<div class="row"><p>No hay productos en el carrito.</p></div><hr>`;
    }
    else {
        productCard.innerHTML += `
        <div class="row">
            <div class="offset-2 col-2"><h5>Nombre</h5></div>
            <div class="col-2"><h5>Costo</h5></div>
            <div class=col-2><h5>Cantidad</h5></div>
            <div class=col-2><h5>Subtotal</h5></div>
        </div><hr>`
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            productCard.innerHTML +=
            `<div class="row">
                <img class="col-2" src=${product.image}>
                <h5 class="col-2">${product.name}</h5>
                <p class="col-2">${product.cost} ${product.currency}</p>
                <div class="col-2 count">
                <button class="btn btn-primary">-</button>
                <input type="number" name="cantidad" value="${product.cantidad}">
                <button class="btn btn-primary">+</button> 
                </div>
                <p class="col-2">${product.cost} ${product.currency}</p>    
            </div><hr>`
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cartProducts();
});