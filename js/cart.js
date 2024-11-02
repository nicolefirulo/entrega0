let cart = JSON.parse(localStorage.getItem("carrito"));

function cartProducts() {
    let productCard = document.getElementById("cartProducts");
    productCard.innerHTML = "";
    if (cart === null) {
        productCard.innerHTML += `<div class="row"><p>No hay productos en el carrito.</p></div><hr class="col-lg-10">`;
    } else {
        productCard.innerHTML += `
        <div class="row text-center">
            <div class="offset-2 col-lg-2 d-none d-lg-block"><h5>Nombre</h5></div>
            <div class="offset-md-3 offset-lg-0 col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Costo</h5></div>
            <div class="col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Cantidad</h5></div>
            <div class="col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Subtotal</h5></div>
        </div><hr class="col-lg-10 d-none d-md-block">`;

        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            const subtotal = product.cost * product.cantidad;

            productCard.innerHTML += `
            <div class="row text-center">
                <div class="col-4 col-sm-3 col-md-3 col-lg-2 text-center product-info m-0">
                    <img src="${product.image}" alt="Imagen del producto" class="img-fluid">
                    <h5 class="d-sm-block d-md-block d-lg-none d-none">${product.name}</h5>
                </div>
                <h5 class="d-md-none d-sm-none d-lg-block col-lg-2 col-4">${product.name}</h5>
                <p class="col-4 col-sm-3 col-md-3 col-lg-2">${product.cost} ${product.currency}</p>
                <div class="col-4 col-sm-3 col-md-3 col-lg-2 d-flex justify-content-center align-items-center count">
                    <button class="btn btn-primary decrease-btn" data-index="${i}">-</button>
                    <input type="number" name="cantidad" class="form-control quantity-input mx-1 text-center" data-index="${i}" value="${product.cantidad}" min="1">
                    <button class="btn btn-primary increase-btn" data-index="${i}">+</button>
                </div>
                <hr class="col-12 d-block d-sm-none"><p class="d-block d-sm-none d-md-none d-lg-none col-4 sub-text">Subtotal</p>
                <p class="col-4 col-sm-3 col-md-3 col-lg-2 subtotal">${subtotal} ${product.currency}</p>  
            </div><hr class="col-lg-10">`;
        }
    }
}

// Actualizar el subtotal en tiempo real
function updateSubtotal(index) {
    const product = cart[index];
    const quantityInput = document.querySelector(`input[data-index="${index}"]`);
    let newQuantity = parseInt(quantityInput.value);

    // Asegurarse de que la cantidad sea al menos 1
    if (newQuantity < 1 || isNaN(newQuantity)) {
        newQuantity = 1;
        quantityInput.value = 1; // Establece visualmente el valor mínimo en 1 
    }

    // Actualizar cantidad y recalcular subtotal
    product.cantidad = newQuantity;
    const newSubtotal = product.cost * newQuantity;
    cart[index] = product;
    localStorage.setItem("carrito", JSON.stringify(cart)); 
    
    const subtotalElement = quantityInput.closest(".row").querySelector(".subtotal");
    subtotalElement.textContent = `${newSubtotal} ${product.currency}`;
}

document.addEventListener("DOMContentLoaded", () => {
    cartProducts();

    // Evento de cambio a cada campo de cantidad
    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("input", (event) => {
            const index = event.target.getAttribute("data-index");
            updateSubtotal(index);
        });
    });

    // Funcionalidad a los botones de + y -
    document.querySelectorAll(".decrease-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            const input = document.querySelector(`input[data-index="${index}"]`);
            input.stepDown();
            if (parseInt(input.value) < 1) input.value = 1; // Aseguramos que la cantidad no sea menor a 1
            input.dispatchEvent(new Event('input')); // Disparar evento para actualizar subtotal
        });
    });

    document.querySelectorAll(".increase-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            const input = document.querySelector(`input[data-index="${index}"]`);
            input.stepUp();
            input.dispatchEvent(new Event('input')); // Disparar evento para actualizar subtotal
        });
    });
});

