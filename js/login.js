document.addEventListener("DOMContentLoaded", function () {
//Campos no vacios y redireccionar a index//
    document.getElementById("redirect").addEventListener("click", function (event) {
        event.preventDefault();

        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || password === "") {
            Swal.fire({
                text: 'Por favor, completa todos los campos',
                icon: 'info',
                confirmButtonText: 'Volver a intentar',
              });
            return;  /* Detiene la ejecución si hay campos vacíos */
        }

        if (!emailPattern.test(email)) {
            Swal.fire({
                text: 'Por favor, ingresa un email válido',
                icon: 'error',
                confirmButtonText: 'Volver a intentar'
              })
            return; /*  Detiene la ejecución si el email no es válido */
        }
        localStorage.setItem("email", email);
        window.location.href = "index.html"; 
    });
});


