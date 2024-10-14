const fileInput = document.getElementById('imageInput'); //Obtiene el elemento de entrada del archivo

function saveImg() {
    const file = fileInput.files[0];
    document.getElementById('previewImg')

    if (file) {
        const reader = new FileReader(); //Crea un objeto FileReader(), el cual se encarga de leer el archivo

        reader.onloadend = () => {
            let base64String = reader.result; //El contenido del archivo se convierte en una cadena de texto en formato Base64
            console.log(base64String);
            localStorage.setItem('imageBase64', base64String); //Guarda en localStorage la cadena Base64
            showImg(); //Muestra la imagen
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

document.addEventListener("DOMContentLoaded", () => {
    showImg();

    fileInput.addEventListener("change", () => {
        saveImg();
    })
    
    const btnSave = document.getElementById("saveChanges");
    btnSave.addEventListener("click", () => {
        saveImg();
    });
    
});