// Asegurarse de que el código se ejecute cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    
    const fileInput = document.getElementById('fileInput'); 
    const form = document.querySelector("form");
    const emailField = document.getElementById("email");

    // Funciones para manejar la img
    function saveImg() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader(); // Crea un objeto FileReader(), el cual se encarga de leer el archivo

            reader.onloadend = () => {
                let base64String = reader.result; // El contenido del archivo se convierte en una cadena de texto en formato Base64
                localStorage.setItem('imageBase64', base64String); // Guarda la imagen en localStorage
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

    function showImg() {
        let base64String = localStorage.getItem("imageBase64");
        if (base64String) {
            document.getElementById('previewImg').setAttribute("src", base64String);
        }
    }

    // Cargar datos del perfil desde localStorage
    function loadProfileData() {
        console.log('Cargando datos del perfil');
        console.log('Nombre almacenado: ', localStorage.getItem("firstName"));
        console.log('Apellido almacenado: ', localStorage.getItem("lastName"));

        document.getElementById("firstName").value = localStorage.getItem("firstName") || "";
        document.getElementById("lastName").value = localStorage.getItem("lastName") || "";
        document.getElementById("secondName").value = localStorage.getItem("secondName") || "";
        document.getElementById("secondLastName").value = localStorage.getItem("secondLastName") || "";
        document.getElementById("phone").value = localStorage.getItem("phone") || "";
    }

    const email = localStorage.getItem("email");
    if (!email) {
        alert("Debes iniciar sesión para acceder a tu perfil");
        window.location.href = "login.html";
        return;
    }

    // Rellenar el campo de email con el email guardado y deshabilitarlo
    emailField.value = email;
    emailField.disabled = true;

    // Cargar la imagen y los datos del perfil
    showImg();
    loadProfileData();

    fileInput.addEventListener("change", saveImg);

    // Manejar el envío del formulario y guardar datos en localStorage
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita la recarga de la página
        console.log('Formulario enviado'); // Mensaje para verificar si se envía el formulario

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        console.log('Nombre: ', firstName, 'Apellido: ', lastName); // Verificar si obtenemos los valores correctos

        // Validar campos obligatorios
        if (firstName === "" || lastName === "") {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Guardar datos en el localStorage
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("secondName", document.getElementById("secondName").value);
        localStorage.setItem("secondLastName", document.getElementById("secondLastName").value);
        localStorage.setItem("phone", document.getElementById("phone").value);

        console.log('Datos guardados en localStorage');
        alert("Datos guardados correctamente.");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el correo electrónico del usuario logueado 
    const emailButton = document.getElementById("emailButton");
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
        emailButton.textContent = userEmail; // Cambia el texto del botón para mostrar el email
    } else {
        emailButton.textContent = "Usuario no logueado";
    }
});