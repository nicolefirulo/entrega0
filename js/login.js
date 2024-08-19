document.addEventListener("DOMContentLoaded", function () {
//Campos no vacios y redireccionar a index//
    document.getElementById("redirect").addEventListener("click", function (event) {
        event.preventDefault();

        let password = document.getElementById("password").value;
        let username = document.getElementById("username").value;

        if (username!= "" && password!= "") {
            window.location.href = "index.html";
        }
    });
});