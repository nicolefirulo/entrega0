document.addEventListener("DOMContentLoaded", function () {
//Campos no vacios y redireccionar a index//
    document.getElementById("redirect").addEventListener("click", function (event) {
        event.preventDefault();

        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || password === "") {
            alert("Por favor, completa todos los campos");
            return;  /* Detiene la ejecución si hay campos vacíos */
        }

        if (!emailPattern.test(email)) {
            alert("Por favor, ingresa un email válido");
            return; /*  Detiene la ejecución si el email no es válido */
        }
        localStorage.setItem("email", email);
        window.location.href = "index.html"; 
    });
});


