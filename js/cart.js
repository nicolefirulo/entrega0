let cart = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para convertir moneda a USD
function convertToUSD(amount, currency) {
  const exchangeRates = {
    UYU: 0.024, // 1 UYU = 0.024 USD 
    USD: 1
  };
  return amount * exchangeRates[currency];
}

function cartProducts() {
  const buyingForm = document.getElementById("buyingForm");
  const productCard = document.getElementById("cartProducts");
  productCard.innerHTML = "";
  if (cart === null) {
      buyingForm.classList.add("d-none") // Para que no se muestre el formulario de compra
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
                <button class="btn btn-warning decrease-btn" data-index="${i}">-</button>
                <input type="number" name="cantidad" class="form-control quantity-input mx-1 text-center" data-index="${i}" value="${product.cantidad}" min="1">
                <button class="btn btn-warning increase-btn" data-index="${i}">+</button>
                <button class="btn btn-dark"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
              <hr class="col-12 d-block d-sm-none"><p class="d-block d-sm-none d-md-none d-lg-none col-4 sub-text">Subtotal</p>
              <p class="col-4 col-sm-3 col-md-3 col-lg-2 subtotal">${subtotal} ${product.currency}</p>  
          </div><hr class="col-lg-10">`;
      }
  }
  updateCosts(); // Actualizar los costos después de mostrar los productos
}

function updateSubtotal(index) {
  const product = cart[index];
  const quantityInput = document.querySelector(`input[data-index="${index}"]`);
  let newQuantity = parseInt(quantityInput.value);

  if (newQuantity < 1 || isNaN(newQuantity)) {
      newQuantity = 1;
      quantityInput.value = 1;
  }

  product.cantidad = newQuantity;
  const newSubtotal = product.cost * newQuantity;
  cart[index] = product;
  localStorage.setItem("carrito", JSON.stringify(cart));

  const subtotalElement = quantityInput.closest(".row").querySelector(".subtotal");
  subtotalElement.textContent = `${newSubtotal} ${product.currency}`;

  updateCosts(); // Actualizar los costos después de cambiar la cantidad
}

// Función para calcular y actualizar costos
function updateCosts() {
  let subtotalUSD = 0;

// Calcular subtotal
  cart.forEach(product => {
    subtotalUSD += convertToUSD(product.cost * product.cantidad, product.currency);
  });

// Obtener opción de envío seleccionada
  const shippingOptions = document.getElementsByName('tipoEnvio');
  let shippingPercentage = 0.05; // Valor por defecto (5%)

  for (const option of shippingOptions) {
    if (option.checked) {
      switch(option.value) {
        case 'option1':
          shippingPercentage = 0.05;
          break;
        case 'option2':
          shippingPercentage = 0.07;
          break;
        case 'option3':
          shippingPercentage = 0.15;
          break;
      }
      break;
    }
  }

// Calcular costo de envío y total
  const shippingCostUSD = subtotalUSD * shippingPercentage;
  const totalUSD = subtotalUSD + shippingCostUSD;

// Actualizar el DOM
  document.querySelector('#resumen ul li:nth-child(1)').textContent = `Subtotal: $${subtotalUSD.toFixed(2)} USD`;
  document.querySelector('#resumen ul li:nth-child(2)').textContent = `Costo de envío: $${shippingCostUSD.toFixed(2)} USD`;
  document.querySelector('#resumen ul li:nth-child(3)').textContent = `Total: $${totalUSD.toFixed(2)} USD`;
}

document.addEventListener("DOMContentLoaded", () => {
  cartProducts();

  document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("input", (event) => {
          const index = event.target.getAttribute("data-index");
          updateSubtotal(index);
      });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          const input = document.querySelector(`input[data-index="${index}"]`);
          input.stepDown();
          if (parseInt(input.value) < 1) input.value = 1;
          input.dispatchEvent(new Event('input'));
      });
  });

  document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          const input = document.querySelector(`input[data-index="${index}"]`);
          input.stepUp();
          input.dispatchEvent(new Event('input'));
      });
  });

// Event listeners para las opciones de envío
  document.querySelectorAll('input[name="tipoEnvio"]').forEach(radio => {
    radio.addEventListener('change', updateCosts);
  });

// Llamada inicial a updateCosts
  updateCosts();
});

const metodoPagoInputs = document.querySelectorAll('input[name="metodoPago"]');
const formCredito = document.getElementById('formCredito');
const formTransferencia = document.getElementById('formTransferencia');

function togglePaymentForm(metodoPago) {
  if (metodoPago === 'credito') {
      formCredito.classList.remove('d-none');
      formTransferencia.classList.add('d-none');
  } else if (metodoPago === 'debito') {
      formCredito.classList.remove('d-none');
      formTransferencia.classList.add('d-none');
  } else {
      formCredito.classList.add('d-none');
      formTransferencia.classList.remove('d-none');
  }
}

metodoPagoInputs.forEach(input => {
  input.addEventListener('change', (e) => {
      togglePaymentForm(e.target.value);
  });
});