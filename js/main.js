//tenemos que validar el que el campo de nombre sea un string y cantidad sea numero 
// en inspeccionar por demos seleccionar el elemento y ver como se llama en el index 
//buscarlo en el index y hacer la variable que obtendra el dato con let txtName =document, getelementebyid ("name"); 
//validad el elemento dela cantidad con Number : let txtNumber = getelementebyid ("name");

let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Name");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
 //agregar la oreja 
// btnAgregar es el nombre del boton, el evento es el click , txtName que es donde se almaceno el valor del input 
// hacemos referencia al valor capturado le decimos que a ese mismo valor le quite los espacios con el trim. 
 btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    txtName.value = txtName.value.trim();
     
    //validar que el nombre tenga 3 letras, se debe incluir el valor y la longitud
    if(txtName.value.length >= 3){ 
        //ponemos borde con style y los pixeles para el grosor del borde 
        txtName.style.border = "solid 3px red";
        //revisar el alert y  ponerlo en block , primero hay que definir la variable arriba pegando el nombre del id 
        //strong es para poner en negritas 
    alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es valido. </strong>";
    alertValidaciones.style.display = "block"; //esto es para mostrar el contenedor
    }
 });

