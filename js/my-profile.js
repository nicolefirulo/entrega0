document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput'); 
    const form = document.querySelector("form");
    const emailField = document.getElementById("email");

    // Guardar la imagen en localStorage
    function saveImg() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader(); // Crea un objeto FileReader(), el cual se encarga de leer el archivo

            reader.onloadend = () => {
                let base64String = reader.result; // El contenido del archivo se convierte en una cadena de texto en formato Base64
                console.log(base64String);
                localStorage.setItem('imageBase64', base64String); // Guarda en localStorage la cadena Base64
                showImg(); // Muestra la imagen
            };

            reader.onerror = (error) => {
                console.error('Error de FileReader:', error);
            };

            reader.readAsDataURL(file);
        } else {
            console.error('No se ha seleccionado ningún archivo');
        }
    }

    // Mostrar la imagen de perfil
    function showImg() {
        let base64String = localStorage.getItem("imageBase64");
        if (base64String) {
            document.getElementById('previewImg').setAttribute("src", base64String);
        }
    }

    // Cargar solo el email desde el localStorage (no el resto de los campos)
    function loadEmail() {
        let email = localStorage.getItem('email');
        if (email) {
            emailField.value = email;
            emailField.disabled = true;
        }
    }

    // Validación de los campos obligatorios
    function validateForm() {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = emailField.value.trim(); 

        if (firstName === "" || lastName === "" || email === "") {
            alert("Por favor, completa todos los campos obligatorios: Nombre, Apellido y E-mail.");
            return false; // No permite el guardado si hay campos obligatorios vacíos
        }
        return true;
    }

    // Manejar el envío del formulario y guardar datos en localStorage
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return; // Detener la ejecución si los campos obligatorios no están completos
        }

        const userProfile = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            secondName: document.getElementById("secondName").value,
            secondLastName: document.getElementById("secondLastName").value,
            phone: document.getElementById("phone").value,
            email: emailField.value, // Mantener el email almacenado
            imageBase64: localStorage.getItem('imageBase64') // Mantener la imagen si ya estaba guardada
        };

        // Guardar el objeto completo del perfil en localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        alert("Datos guardados correctamente.");
    });

    // Cargar imagen y solo el email al cargar la página
    showImg();
    loadEmail();

    // Manejar el cambio de imagen
    fileInput.addEventListener("change", saveImg);
});
