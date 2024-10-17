document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    // Lógica de modo oscuro
   const btnSwitch = document.querySelector('#switch');

   // Cargar preferencia de modo oscuro desde localStorage
   if (localStorage.getItem('dark-mode') === 'true') {
       document.body.classList.add('dark');
       btnSwitch.classList.add('active');
   }
 
   btnSwitch.addEventListener('click', () => {
       document.body.classList.toggle('dark');
       btnSwitch.classList.toggle('active');
 
       // Guardar el estado del modo oscuro en localStorage
       if (document.body.classList.contains('dark')) {
           localStorage.setItem('dark-mode', 'true');
       } else {
           localStorage.setItem('dark-mode', 'false');
       }
   });
 });