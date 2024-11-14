let cart = JSON.parse(localStorage.getItem("carrito"));
//Funcion para mostrar los productos del carrito
function cartProducts() {
    const buyingForm = document.getElementById("buyingForm");
    const productCard = document.getElementById("cartProducts");
    productCard.innerHTML = "";
    if (cart === null) {
        buyingForm.classList.add("d-none") //Para que no se muestre el formulario de compra
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



document.addEventListener('DOMContentLoaded', function () {
    /* Obtener los radio buttons */
    let creditoRadio = document.getElementById('credito');
    let debitoRadio = document.getElementById('debito');

    /* Obtener los formularios */
    let debitoForm = document.getElementById('debitoForm');
    let creditoForm = document.getElementById('creditoForm');

    /* Funcion para mostrar el formulario correcto segun el tipo de pago seleccionado */
    function mostrarFormulario() {
        if (creditoRadio.checked) {
            creditoForm.style.display = 'block';
            debitoForm.style.display = 'none';
        } else if (debitoRadio.checked) {
            debitoForm.style.display = 'block';
            creditoForm.style.display = 'none';
        }
    }
    creditoRadio.addEventListener('change', mostrarFormulario);
    debitoRadio.addEventListener('change', mostrarFormulario);
    mostrarFormulario();


    let finalizarCompraBtn = document.getElementById('finalizarCompra');
  
    finalizarCompraBtn.addEventListener('click', function () {
        if (validarFormulario()) {
            Swal.fire({
                text: 'Compra exitosa',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
  
    /* Funcion para validar el formulario antes de finalizar la compra */
    function validarFormulario() {
        let valid = true;
        let errorMessage = '';
  
        /* Validar campos de direccion */
        let direccionCampos = ['departamento', 'localidad', 'calle', 'numero', 'esquina'];
        let camposVaciosDireccion = [];
  
        direccionCampos.forEach(campoId => {
            let campo = document.getElementById(campoId);
            if (campo && !campo.value.trim()) {
                camposVaciosDireccion.push(campoId);
            }
        });
  
        /* Validacion de los campos de pago */
        let metodoPagoValido = false;
  
        if (creditoRadio.checked) {
            metodoPagoValido = validarCamposPago(['numeroC', 'nombreC', 'vencimientoC', 'codigoC', 'cuotas']);
        } else if (debitoRadio.checked) {
            metodoPagoValido = validarCamposPago(['numeroD', 'nombreD', 'vencimientoD', 'codigoD']);
        }
  
      /* Verificar si se completaron los campos de pago */
      let camposVaciosPago = !metodoPagoValido;
  
      /* Si hay campos vacios en entrega o pago */
      if (camposVaciosDireccion.length > 0 && camposVaciosPago) {
          valid = false;
          errorMessage = 'Por favor, complete todos los campos';
      } else if (camposVaciosDireccion.length > 0) {
          valid = false;
          errorMessage = 'Por favor, complete todos los campos de dirección';
      } else if (camposVaciosPago) {
          valid = false;
          errorMessage = 'Por favor, complete los campos del método de pago seleccionado';
      }

      if (!valid) {
          Swal.fire({
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Volver a intentar'
          });
      }
  
        return valid;
    }

    /* Funcion para validar los campos del metodo de pago */
    function validarCamposPago(campos) {
        let camposVacios = [];
        campos.forEach(campoId => {
            let campo = document.getElementById(campoId);
            if (campo && !campo.value.trim()) {
                camposVacios.push(campoId);
            }
        });
        return camposVacios.length === 0;
    }
});