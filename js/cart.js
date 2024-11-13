let cart = JSON.parse(localStorage.getItem("carrito")) || [];
let shippingPercentage = 0.05; // Valor por defecto para envío estándar

function cartProducts() {
    const buyingForm = document.getElementById("buyingForm");
    const productCard = document.getElementById("cartProducts");
    productCard.innerHTML = ""; // Limpia el contenido del carrito


    if (cart.length === 0) {
        buyingForm.classList.add("d-none"); //Para que no se muestre el formulario de compra
        productCard.innerHTML = `<div class="row"><p>No hay productos en el carrito.</p></div><hr class="col-lg-10">`;
    } else {
        buyingForm.classList.remove("d-none"); // Muestra el formulario de compra si hay productos
        productCard.innerHTML = `
            <div class="row text-center">
                <div class="offset-2 col-lg-2 d-none d-lg-block"><h5>Nombre</h5></div>
                <div class="offset-md-3 offset-lg-0 col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Costo</h5></div>
                <div class="col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Cantidad</h5></div>
                <div class="col-4 col-lg-2 col-md-3 d-none d-md-block"><h5>Subtotal</h5></div>
            </div>
            <hr class="col-lg-10 d-none d-md-block">
            ${cart.map((product, index) => `
                <div class="row text-center" data-index="${index}">
                    <div class="col-4 col-sm-3 col-md-3 col-lg-2 text-center product-info m-0">
                        <img src="${product.image}" alt="Imagen del producto" class="img-fluid">
                        <h5 class="d-sm-block d-md-block d-lg-none d-none">${product.name}</h5>
                    </div>
                    <h5 class="d-md-none d-sm-none d-lg-block col-lg-2 col-4">${product.name}</h5>
                    <p class="col-4 col-sm-3 col-md-3 col-lg-2">${product.cost} ${product.currency}</p>
                    <div class="col-4 col-sm-3 col-md-3 col-lg-2 d-flex justify-content-center align-items-center count">
                        <button class="btn btn-warning decrease-btn">-</button>
                        <input type="number" name="cantidad" class="form-control quantity-input mx-1 text-center" value="${product.cantidad}" min="1" data-index="${index}">
                        <button class="btn btn-warning increase-btn">+</button>
                        <button class="btn btn-dark remove-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                    <hr class="col-12 d-block d-sm-none">
                    <p class="d-block d-sm-none d-md-none d-lg-none col-4 sub-text">Subtotal</p>
                    <p class="col-4 col-sm-3 col-md-3 col-lg-2 subtotal">${product.cost * product.cantidad} ${product.currency}</p>  
                </div>
                <hr class="col-lg-10">
            `).join('')}
        `;
    }
    updateCosts(); // Calcula y actualiza los costos
}

// Actualizar el subtotal  de un producto específicoen tiempo real
function updateSubtotal(index) 
 {
    const product = cart[index];
    const row = document.querySelector(`[data-index="${index}"]`);
    const quantityInput = row.querySelector('.quantity-input');
    let newQuantity = parseInt(quantityInput.value);

// Asegurarse de que la cantidad sea al menos 1
    if (newQuantity < 1 || isNaN(newQuantity)) {
        newQuantity = 1;
        quantityInput.value = 1;  // Establece visualmente el valor mínimo en 1 
    }

//Actualiza cantidad y recalcula el subtotal del producto
    product.cantidad = newQuantity;
    const newSubtotal = product.cost * newQuantity;
    cart[index] = product;
    saveCart();

    row.querySelector('.subtotal').textContent = `${newSubtotal} ${product.currency}`;
    updateCosts();
}

//Actualizamos costos del carrito (subtotal,envio y total)
function updateCosts() {
    const subtotal = cart.reduce((sum, product) => sum + (product.cost * product.cantidad), 0);
    const shippingCost = subtotal * shippingPercentage;
    const total = subtotal + shippingCost;

    document.querySelector('#resumen ul li:nth-child(1)').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('#resumen ul li:nth-child(2)').textContent = `$${shippingCost.toFixed(2)}`;
    document.querySelector('#resumen ul li:nth-child(3)').textContent = `$${total.toFixed(2)}`;
}

//Manejar cambios en la cantidad 
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    cart[index].cantidad = newQuantity;
    localStorage.setItem("carrito", JSON.stringify(cart));
    cartProducts(); 
}

//Eliminar elementos 
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(cart));
    cartProducts(); //rendirizar 
}

//Guardar carrito en LocalStorage
function saveCart() {
    localStorage.setItem("carrito", JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    cartProducts(); // renderiza carrito al cargrar 

//Reajuste de costos segun tipo de envio seleccionado 
    document.querySelectorAll('input[name="tipoEnvio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            switch(e.target.id) {
                case 'standard':
                    shippingPercentage = 0.05;
                    break;
                case 'express':
                    shippingPercentage = 0.07;
                    break;
                case 'premium':
                    shippingPercentage = 0.15;
                    break;
            }
            updateCosts(); // Recalcula los costos
        });
    });

//Detecta cambios de cantidad y actualiza 
    document.getElementById('cartProducts').addEventListener('click', (e) => {
        if (e.target.classList.contains('decrease-btn') || e.target.classList.contains('increase-btn')) {
            const index = parseInt(e.target.closest('.row').dataset.index);
            const currentQuantity = parseInt(cart[index].cantidad);
            updateQuantity(index, e.target.classList.contains('decrease-btn') ? currentQuantity - 1 : currentQuantity + 1);
        } else if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
            const index = parseInt(e.target.closest('.row').dataset.index);
            removeItem(index);
        }
    });

 // Actualiza el carrito cuando se cambia la cantidad directamente en el input
    document.getElementById('cartProducts').addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.closest('.row').dataset.index);
            updateQuantity(index, parseInt(e.target.value));
        }
    });
});